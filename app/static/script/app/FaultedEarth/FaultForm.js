/*
 * @requires FaultedEarth.js
 */

FaultedEarth.FaultForm = Ext.extend(gxp.plugins.Tool, {
    
    ptype: "app_faultform",
    
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
        FaultedEarth.FaultForm.superclass.init.apply(this, arguments);
        
        this.sessionFids = [];
        var featureManager = target.tools[this.featureManager];
        featureManager.featureLayer.events.on({
            "featureselected": function(e) {
                if (!e.feature.fid) {
                    return;
                }
                if (featureManager.layerRecord.get("name") == "geonode:fault_view") {
                    this.target.faultId = e.feature.fid;
                }
            },
            "featureunselected": function(e) {
                if (this.active && featureManager.layerRecord.get("name") == "geonode:fault_view") {
                    this.target.faultId = null;
                }
            },
            scope: this
        });
    },
    
    addOutput: function(config) {
        return FaultedEarth.FaultForm.superclass.addOutput.call(this, {
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
                html: "Join fault sections to create a fault...<br></br> Filter the grid with the options below."
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
        if (FaultedEarth.FaultForm.superclass.activate.apply(this, arguments)) {
            var featureManager = this.target.tools[this.featureManager];
            featureManager.setLayer();
            if (!this.layerRecord) {
                this.target.createLayerRecord({
                    name: "geonode:fault_view",
                    source: "local"
                }, function(record) {
                    this.layerRecord = record;
                    featureManager.setLayer(record);
                }, this);
            } else {
                featureManager.setLayer(this.layerRecord);
            }
            this.output[0].newFeaturesOnly.setValue(false);
            this.output[0].nameContains.setValue("");
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
                                this.output[0].newFeaturesOnly.setDisabled(!this.sessionFids.length);
                            }
                        }
                    },
                    "load": function() {
                        this.target.faultId && window.setTimeout((function() {
                            var feature = mgr.featureLayer.getFeatureByFid(this.target.faultId);
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
        if (FaultedEarth.FaultForm.superclass.deactivate.apply(this, arguments)) {
            this.target.tools[this.featureManager].featureStore.un("save", this.monitorSave, this);
        }
    },
    
    updateFilter: function() {
        var form = this.output[0];
        var filters = [];
        form.newFeaturesOnly.getValue() && filters.push(
            new OpenLayers.Filter.FeatureId({fids: this.sessionFids})
        );
        form.nameContains.getValue() && filters.push(
            new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.LIKE,
                property: "name",
                value: "*" + form.nameContains.getValue() + "*",
                matchCase: false
            })
        );
        var filter;
        if (filters.length > 0) {
            filter = filters.length == 1 ? filters[0] :
                new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: filters
                });
        }
        this.target.tools[this.featureManager].loadFeatures(filter);
    },
   
});

Ext.preg(FaultedEarth.FaultForm.prototype.ptype, FaultedEarth.FaultForm);