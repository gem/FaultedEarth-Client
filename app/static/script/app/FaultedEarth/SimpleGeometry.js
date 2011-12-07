/*
 * @requires FaultedEarth.js
 */

FaultedEarth.SimpleGeometryForm = Ext.extend(gxp.plugins.Tool, {
    
    ptype: "app_simplegeometryform",
    
    /** api: config[featureManager]
     *  ``String`` id of the FeatureManager to add uploaded features to
     */
    
    /** api: config[featureEditor]
     *  ``String`` id of the FeatureEditor to modify uploaded features
     */
    
    /** api: config[temporaryWorkspace]
     *  ``String`` temporary GeoServer workspace for shapefile uploads.
     *  Default is "temp".
     */
    temporaryWorkspace: "temp",

    /** api: config[temporaryWorkspaceNamespaceUri]
     *  ``String`` namespace uri of the temporary GeoServer workspace for
     *  shapefile uploads. Default is "http://geonode.org/temporary".
     */
    temporaryWorkspaceNamespaceUri: "http://geonode.org/temporary",
    
    /** private: property[sessionFids]
     *  ``Array`` fids of features added/modified in this session
     */
    sessionFids: null,
    
    autoActivate: false,
    
    init: function(target) {
        FaultedEarth.SimpleGeometryForm.superclass.init.apply(this, arguments);
        
        this.sessionFids = [];
        var featureManager = target.tools[this.featureManager];
        featureManager.featureLayer.events.on({
            "featureselected": function(e) {
                if (!e.feature.fid) {
                    return;
                }
                if (featureManager.layerRecord.get("name") == "geonode:observations_fault") {
                    this.target.summaryId = e.feature.fid;
                }
            },
            "featureunselected": function(e) {
                if (this.active && featureManager.layerRecord.get("name") == "geonode:observations_fault") {
                    this.target.summaryId = null;
                }
            },
            scope: this
        });
    },
    
    addOutput: function(config) {
        return FaultedEarth.SimpleGeometryForm.superclass.addOutput.call(this, {
            xtype: "form",
            labelWidth: 110,
            defaults: {
                anchor: "100%"
            },
            items: [{
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "Select a fault from the grid below, then use the modify button to create a simple geometry that will be used to create a fault source polygon" 
            },{
                xtype: "container",
                layout: "hbox",
                cls: "composite-wrap",
                fieldLabel: "Edit a simplified fault geometry",
                items: [{
                    id: this.id + "_tooltarget",
                    xtype: "container",
                    cls: "toolbar-spaced",
                    layout: "toolbar"
                }]
            }, {
                xtype: "box",
                autoEl: {
                    tag: "p",
                    cls: "x-form-item"
                },
                html: "Once a fault has the required attributes, and simplified geometry, select a fault from the grid and use the 'generate' button to calculate a fault source."
            }, {
                xtype: "container",
                layout: "hbox",
                fieldLabel: "Generate Fault Source",
                items: [{
                    xtype: "button",
                    text: "Generate",
                    iconCls: "icon-layer-switcher",
                    handler: function() {
                        var featureManager = this.target.tools[this.featureManager];
                        Ext.Ajax.request({
                            method: "PUT",
                            url: this.target.localGeoNodeUrl + this.target.localHostname + '/observations/faultsource/create',
                            params: Ext.encode({fault_id: this.target.summaryId, name: ''}),
                            success: function(response, opts) {
                                alert('Fault source generated');
                            },
                            failure: function(response, opts){
                                alert('Failed to generate the Fault source');
                            },

                            scope: this
                        });

                    },
                    scope: this
                    }]
             }],
            listeners: {
                "added": function(cmp, ct) {
                    ct.on({
                        "expand": function() { this.activate(); },
                        "collapse": function() { this.deactivate(); },
                        scope: this
                    });
                },
                scope: this
            }
        });
    },
    
    activate: function() {
        if (FaultedEarth.SimpleGeometryForm.superclass.activate.apply(this, arguments)) {
            var featureManager = this.target.tools[this.featureManager];
            featureManager.setLayer();
            if (!this.layerRecord) {
                this.target.createLayerRecord({
                    name: "geonode:observations_fault",
                    source: "local"
                }, function(record) {
                    this.layerRecord = record;
                    featureManager.setLayer(record);
                }, this);
            } else {
                featureManager.setLayer(this.layerRecord);
            }
            featureManager.on("layerchange", function(mgr, rec) {
                mgr.featureStore.on({
                    "save": function(store, batch, data) {
                        var fid;
                        for (var action in data) {
                            for (var i=data[action].length-1; i>=0; --i) {
                                fid = data[action][i].feature.fid;
                                this.sessionFids.remove(fid);  
                                if (action != "destroy") {
                                    this.sessionFids.push(fid);
                                }
                            }
                        }
                    },
                    "load": function() {
                        this.target.summaryId && window.setTimeout((function() {
                            var feature = mgr.featureLayer.getFeatureByFid(this.target.summaryId);
                            if (feature && feature.layer.selectedFeatures.indexOf(feature) == -1) {
                                feature.layer.selectedFeatures.push(feature);
                                feature.layer.events.triggerEvent("featureselected", {feature: feature});
                            }
                        }).createDelegate(this), 0);
                    },
                    scope: this
                });
            }, this, {single: true});
        }
    },
    
    deactivate: function() {
        if (FaultedEarth.SimpleGeometryForm.superclass.deactivate.apply(this, arguments)) {
            this.target.tools[this.featureManager].featureStore.un("save", this.monitorSave, this);
        }
    },

    showUploadWindow: function() {
        var uploadWindow = new Ext.Window({
            title: "Import Faults",
            width: 250,
            autoHeight: true,
            modal: true,
            items: [{
                xtype: "form",
                ref: "form",
                padding: 10,
                border: false,
                autoHeight: true,
                labelWidth: 40,
                defaults: {
                    anchor: "100%"
                },
                items: [{
                    xtype: "box",
                    autoEl: {
                        tag: "p",
                        cls: "x-form-item"
                    },
                    html: "<b>Select a zipped shapefile for uploading.</b> The shapefile needs to have a line geometry."
                }, {
                    xtype: "fileuploadfield",
                    ref: "fileField",
                    fieldLabel: "File",
                    allowBlank: false,
                    listeners: {
                        "fileselected": function(field, file) {
                            field.ownerCt.uploadButton.enable();
                        }
                    }
                }],
                buttonAlign: "center",
                buttons: [{
                    text: "Upload",
                    ref: "../uploadButton",
                    disabled: true,
                    handler: function() {
                        var file = uploadWindow.form.fileField.fileInput.dom.files[0];
                        Ext.Ajax.request({
                            method: "PUT",
                            url: this.target.localGeoServerUrl + "rest/workspaces/" +
                                this.temporaryWorkspace + "/datastores/" +
                                file.fileName + "/file.shp?update=overwrite",
                            xmlData: file,
                            headers: {
                                "Content-Type": file.fileName.split(".").pop().toLowerCase() == "zip" ?
                                    "application/zip" : file.type
                            },
                            success: this.handleUpload.createDelegate(this,
                                [file.fileName, uploadWindow], true),
                            scope: this
                        });
                    },
                    scope: this
                }]
            }]
        });
        uploadWindow.show();
    },

    handleUpload: function(response, options, fileName, uploadWindow) {
        uploadWindow.close();
        var fileParts = fileName.split(".");
        fileParts.pop();
        var layerName = fileParts.join("");
        new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            srsName: this.target.mapPanel.map.getProjectionObject().getCode(),
            url: this.target.localGeoServerUrl + "wfs",
            featureType: layerName,
            featureNS: this.temporaryWorkspaceNamespaceUri,
            outputFormat: "GML2"
        }).read({
            callback: function(response) {
                var extent = new OpenLayers.Bounds();
                var features = response.features, feature, date;
                for (var i=features.length-1; i>=0; --i) {
                    feature = features[i];
                    extent.extend(feature.geometry.getBounds());
                    feature.fid = null;
                    feature.state = OpenLayers.State.INSERT;
                    // convert dates
                    for (var a in feature.attributes) {
                        date = Date.parseDate(feature.attributes[a], "Y/m/d");
                        if (date) {
                            feature.attributes[a] = date.format("c");
                        }
                    }
                }
                var featureManager = this.target.tools[this.featureManager];
                featureManager.featureLayer.addFeatures(features);
                featureManager.featureStore.save();
                
                var featureEditor = this.target.tools[this.featureEditor];
                featureEditor.actions[1].control.activate();
                this.target.mapPanel.map.zoomToExtent(extent);
            },
            scope: this
        });
        //TODO remove uploaded layer/store/style or call GeoNode updatelayers
    }
    
});

Ext.preg(FaultedEarth.SimpleGeometryForm.prototype.ptype, FaultedEarth.SimpleGeometryForm);
