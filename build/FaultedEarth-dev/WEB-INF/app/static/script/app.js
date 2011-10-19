
FaultedEarth=Ext.extend(gxp.Viewer,{summaryId:null,constructor:function(config){Ext.Window.prototype.shadow=false;var propertyNames={"name":"Fault Name","sec_name":"Fault Section Name","episodi_is":"Episodic behaviour (yes/no)","episodi_ac":"Episodic behaviour (active/inactive)","length":"Length (km, pref, min, max)","u_sm_d_min":"Upper seismogenic depth min (km)","u_sm_d_max":"Upper seismogenic depth max (km)","u_sm_d_pre":"Upper seismogenic depth pref (km)","u_sm_d_com":"Upper seismogenic completeness (1, 2, 3, or 4)","low_d_min":"Lower seismogenic depth min (km)","low_d_max":"Lower seismogenic depth max (km)","low_d_pref":"Lower seismogenic depth pref (km)","low_d_com":"Lower seismogenic completeness (1, 2, 3, or 4)","strike":"Strike (...\u00B0)","dip_min":"Dip min (...\u00B0)","dip_max":"Dip max (...\u00B0)","dip_pref":"Dip pref (...\u00B0)","dip_com":"Dip data completeness factor (1, 2, 3, or 4)","dip_dir":"Dip direction (...\u00B0)","down_thro":"Downthrown side (N, S, W, E or NW etc.)","slip_typ":"Slip type (Reverse etc.)","slip_com":"Slip type completeness (1, 2, 3, or 4)","slip_r_min":"Slip rate min (mm/yr)","slip_r_max":"Slip rate max (mm/yr)","slip_r_pre":"Slip rate pref (mm/yr)","slip_r_com":"Slip rate completeness (1, 2, 3, or 4)","aseis_slip":"Aseismic-slip factor (0-1)","aseis_com":"Aseismic-slip completeness (1, 2, 3, or 4)","dis_min":"Displacement min (m)","dis_max":"Displacement max (m)","dis_pref":"Displacement pref (m)","re_int_min":"Recurrence interval min (yr)","re_int_max":"Recurrence interval max (yr)","re_int_pre":"Recurrence interval pref (yr)","mov_min":"Age of last movement min (yr BP)","mov_max":"Age of last movement max (yr BP)","mov_pref":"Age of last movement pref (yr BP)","all_com":"Overall data completeness (1, 2, 3, or 4)","created":"Date created (date)","compiler":"Compiled by (name)","contrib":"Contributed by (name)","observationType":"Observation Type","slipType":"Slip Type","hv_ratio":"H:V Ratio","rake":"Rake (deg)","net_slip_rate_min":"Net Slip Rate Min (mm/yr)","net_slip_rate_max":"Net Slip Rate Max (mm/yr)","net_slip_rate_pref":"Net Slip Rate Pref (mm/yr)","dip_slip_rate_min":"Dip Slip Rate Min (mm/yr)","dip_slip_rate_max":"Dip Slip Rate Max (mm/yr)","dip_slip_rate_pref":"Dip Slip Rate Pref (mm/yr)","marker_age":"Marker Age (yrs BP)","slip_rate_category":"Slip Rate Category","strike_slip_rate_min":"Strike Slip Rate Min (mm/yr)","strike_slip_rate_max":"Strike Slip Rate Max (mm/yr)","strike_slip_rate_pref":"Strike Slip Rate Pref (mm/yr)","vertical_slip_rate_min":"Vertical Slip Rate Min (mm/yr)","vertical_slip_rate_max":"Vertical Slip Rate Max (mm/yr)","vertical_slip_rate_pref":"Vertical Slip Rate Pref (mm/yr)","site":"Site","notes":"Notes","summary_id":"Fault Section Summary ID","fault_name":"Fault Name","loc_meth":"Location Method","scale":"Scale","accuracy":"Accuracy","geomor_exp":"Geomorphic Expression","notes":"Notes","fault_section_id":"Id"};Ext.applyIf(config,{proxy:"/proxy?url=",mapItems:[{xtype:"gx_zoomslider",vertical:true,height:100}],portalItems:[{region:"center",layout:"border",tbar:{id:"paneltbar",items:["-"]},items:[{id:"west",region:"west",layout:"accordion",width:280,split:true,collapsible:true,collapseMode:"mini",header:false,border:false,defaults:{hideBorders:true,autoScroll:true},items:[{id:"tree",title:"Layers"},{id:'trace',title:"Trace Form",padding:10},{id:'summary',title:"Neotectonic Section Summary",padding:10},{id:'observations',title:"Observations",layout:"fit",autoScroll:false},{id:"fault",title:"Fault Summary"}]},"map",{id:"featuregrid",layout:"fit",region:"south",border:false,height:200,split:true,collapseMode:"mini"}]}],tools:[{actionTarget:{target:"paneltbar",index:0},outputAction:0,outputConfig:{title:"Faulted Earth",width:300,height:300,modal:true,bodyCfg:{tag:"iframe",src:"about.html",style:{border:0}}},actions:[{iconCls:"icon-geoexplorer",text:"Faulted Earth"}]},{ptype:"gxp_layertree",outputTarget:"tree"},{ptype:"gxp_featuremanager",id:"featuremanager",autoLoadFeatures:true,autoSetLayer:false,paging:false,maxFeatures:100},{ptype:"gxp_featuregrid",alwaysDisplayOnMap:true,displayMode:"selected",featureManager:"featuremanager",outputTarget:"featuregrid",outputConfig:{id:"grid",propertyNames:propertyNames}},{ptype:"gxp_selectedfeatureactions",featureManager:"featuremanager",actions:[{menuText:"Feature context demo",text:"Feature context demo",urlTemplate:"/geoserver/wms/reflect?layers={layer}&width=377&height=328&format=application/openlayers&featureid={fid}"}],actionTarget:["grid.contextMenu","grid.bbar"],outputConfig:{width:410,height:410}},{ptype:"app_summaryform",id:"summaryform",featureManager:"featuremanager",featureEditor:"featureeditor",outputTarget:"summary"},{ptype:"gxp_featureeditor",id:"featureeditor",featureManager:"featuremanager",actionTarget:"summaryform_tooltarget",snappingAgent:"snapping-agent",outputConfig:{propertyNames:propertyNames}},{ptype:"app_traceform",id:"traceform",featureManager:"featuremanager",featureEditor:"featureeditor",outputTarget:"trace"},{ptype:"gxp_featureeditor",id:"featureeditor",featureManager:"featuremanager",actionTarget:"traceform_tooltarget",createFeatureActionText:"Draw",editFeatureActionText:"Modify",snappingAgent:"snapping-agent",outputConfig:{propertyNames:propertyNames}},{ptype:"app_faultform",id:"faultform",featureManager:"featuremanager",featureEditor:"featureeditor",outputTarget:"fault"},{ptype:"gxp_featureeditor",id:"featureeditor",featureManager:"featuremanager",actionTarget:"faultform_tooltarget",snappingAgent:"snapping-agent",outputConfig:{propertyNames:propertyNames}},{ptype:"gxp_tool",id:"featureselector",featureManager:"featuremanager",actionTarget:"summaryform_tooltarget",},{ptype:"gxp_wmsgetfeatureinfo",outputConfig:{width:400}},{ptype:"app_observations",featureManager:"featuremanager",outputTarget:"observations"},{ptype:"gxp_zoomtoextent",actionTarget:"map.tbar"},{ptype:"gxp_zoom",actionTarget:"map.tbar"},{ptype:"gxp_navigationhistory",actionTarget:"map.tbar"},{ptype:"gxp_featuremanager",id:"trace_manager",paging:false,layer:{source:"local",name:"geonode:trace"}},{ptype:"gxp_tool",featureManager:"trace_manager",actionTarget:"map.tbar",autoLoadFeatures:true,targets:[{source:"local",name:"geonode:fault_summary"}]},{ptype:"gxp_snappingagent",id:"snapping-agent",targets:[{source:"local",name:"geonode:fault_summary"}]}]});FaultedEarth.superclass.constructor.apply(this,arguments);}});FaultedEarth.FaultForm=Ext.extend(gxp.plugins.Tool,{ptype:"app_faultform",temporaryWorkspace:"temp",temporaryWorkspaceNamespaceUri:"http://geonode.org/temporary",sessionFids:null,autoActivate:false,init:function(target){FaultedEarth.FaultForm.superclass.init.apply(this,arguments);this.sessionFids=[];var featureManager=target.tools[this.featureManager];featureManager.featureLayer.events.on({"featureselected":function(e){if(!e.feature.fid){return;}
if(featureManager.layerRecord.get("name")=="geonode:fault_view"){this.target.faultId=e.feature.fid;}},"featureunselected":function(e){if(this.active&&featureManager.layerRecord.get("name")=="geonode:fault_view"){this.target.faultId=null;}},scope:this});},addOutput:function(config){return FaultedEarth.FaultForm.superclass.addOutput.call(this,{xtype:"form",labelWidth:110,defaults:{anchor:"100%"},items:[{xtype:"box",autoEl:{tag:"p",cls:"x-form-item"},html:"Join fault sections to create a fault...<br></br> Filter the grid with the options below."},{xtype:"textfield",ref:"nameContains",fieldLabel:"Search for name",validationDelay:500,listeners:{"valid":this.updateFilter,scope:this}},{xtype:"checkbox",ref:"newFeaturesOnly",hideLabel:true,disabled:true,boxLabel:"Only show grid rows from this session",handler:this.updateFilter,scope:this}],listeners:{"added":function(cmp,ct){ct.on({"expand":function(){this.activate();},"collapse":function(){this.deactivate();},scope:this});},scope:this}});},activate:function(){if(FaultedEarth.FaultForm.superclass.activate.apply(this,arguments)){var featureManager=this.target.tools[this.featureManager];featureManager.setLayer();if(!this.layerRecord){this.target.createLayerRecord({name:"geonode:fault_view",source:"local"},function(record){this.layerRecord=record;featureManager.setLayer(record);},this);}else{featureManager.setLayer(this.layerRecord);}
this.output[0].newFeaturesOnly.setValue(false);this.output[0].nameContains.setValue("");featureManager.on("layerchange",function(mgr,rec){mgr.featureStore.on({"save":function(store,batch,data){var fid;for(var action in data){for(var i=data[action].length-1;i>=0;--i){fid=data[action][i].feature.fid;this.sessionFids.remove(fid);if(action!="destroy"){this.sessionFids.push(fid);}
this.output[0].newFeaturesOnly.setDisabled(!this.sessionFids.length);}}},"load":function(){this.target.faultId&&window.setTimeout((function(){var feature=mgr.featureLayer.getFeatureByFid(this.target.faultId);if(feature&&feature.layer.selectedFeatures.indexOf(feature)==-1){feature.layer.selectedFeatures.push(feature);feature.layer.events.triggerEvent("featureselected",{feature:feature});}}).createDelegate(this),0);},scope:this});},this,{single:true});}},deactivate:function(){if(FaultedEarth.FaultForm.superclass.deactivate.apply(this,arguments)){this.target.tools[this.featureManager].featureStore.un("save",this.monitorSave,this);}},updateFilter:function(){var form=this.output[0];var filters=[];form.newFeaturesOnly.getValue()&&filters.push(new OpenLayers.Filter.FeatureId({fids:this.sessionFids}));form.nameContains.getValue()&&filters.push(new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.LIKE,property:"name",value:"*"+form.nameContains.getValue()+"*",matchCase:false}));var filter;if(filters.length>0){filter=filters.length==1?filters[0]:new OpenLayers.Filter.Logical({type:OpenLayers.Filter.Logical.AND,filters:filters});}
this.target.tools[this.featureManager].loadFeatures(filter);},});Ext.preg(FaultedEarth.FaultForm.prototype.ptype,FaultedEarth.FaultForm);FaultedEarth.Observations=Ext.extend(gxp.plugins.Tool,{ptype:"app_observations",layerRecord:null,observationId:null,filter:null,autoActivate:false,init:function(target){var featureManager=target.tools[this.featureManager];featureManager.featureLayer.events.on({"featureselected":function(e){if(!e.feature.fid){return;}
if(featureManager.layerRecord.get("name")=="geonode:observations_observations"){this.observationId=e.feature.fid;this.setIFrameUrl("/observations/obsform/edit/"+e.feature.fid.split(".").pop()+"/summary_id/"+this.target.summaryId.split(".").pop());}else if(this.target.summaryId){this.output[0].ownerCt.enable();this.setIFrameUrl("/observations/obsform/new/summary_id/"+this.target.summaryId.split(".").pop());}},"featureunselected":function(e){if(featureManager.layerRecord.get("name")=="geonode:observations_observations"){this.setIFrameUrl("/observations/obsform/new/summary_id/"+this.target.summaryId.split(".").pop());}else if(!this.target.summaryId){this.output[0].ownerCt.disable();}},scope:this});this.filter=new OpenLayers.Filter.Comparison({property:"summary_id",value:-1,type:OpenLayers.Filter.Comparison.EQUAL_TO});FaultedEarth.Observations.superclass.init.apply(this,arguments);},addOutput:function(config){function adjustIframeSize(cmp){cmp.body.setHeight(cmp.ownerCt.getHeight()-cmp.el.getOffsetsTo(cmp.ownerCt.body)[1]);cmp.body.setWidth(cmp.ownerCt.getWidth());}
return FaultedEarth.Observations.superclass.addOutput.call(this,{renderHidden:true,items:[{xtype:"box",style:"padding: 10px",autoEl:{tag:"p",cls:"x-form-item"},html:"<b>Create a new observation</b> below, or <b>select an existing one</b> from the grid at the bottom of the page."},{xtype:"form",border:false,labelAlign:"top",style:"padding: 0 10px 10px 10px",items:[{xtype:"combo",anchor:"100%",fieldLabel:"Filter observations in the grid",store:new Ext.data.ArrayStore({data:[["orphan","not associated with any fault"],["mine","associated with this fault"],["theirs","associated with other faults"],["visible","with location, visible on the map"]],fields:["name","title"],idIndex:0}),value:"orphan",displayField:"title",valueField:"name",editable:false,mode:"local",triggerAction:"all",listeners:{"select":this.updateFilter,scope:this}}]},{ref:"iFrame",bodyCfg:{tag:"iframe",style:{border:"0px none"}},listeners:{"added":function(ct,cmp){ct.on({"resize":adjustIframeSize,"afterlayout":adjustIframeSize});}}}],listeners:{"added":function(cmp,ct){ct.disable();ct.on({"expand":function(){this.activate();},"collapse":function(){this.deactivate();},scope:this});},scope:this}});},activate:function(){if(FaultedEarth.Observations.superclass.activate.apply(this,arguments)){var featureManager=this.target.tools[this.featureManager];featureManager.setLayer();if(!this.layerRecord){this.target.createLayerRecord({name:"geonode:observations_observations",source:"local"},function(record){this.layerRecord=record;featureManager.setLayer(record);},this);}else{featureManager.setLayer(this.layerRecord);}
featureManager.on("layerchange",function(mgr,rec){if(rec===this.layerRecord){mgr.loadFeatures(this.filter);mgr.featureStore.on({"load":function(){this.observationId&&window.setTimeout((function(){var feature=mgr.featureLayer.getFeatureByFid(this.observationId);if(feature&&feature.layer.selectedFeatures.indexOf(feature)==-1){feature.layer.selectedFeatures.push(feature);feature.layer.events.triggerEvent("featureselected",{feature:feature});}}).createDelegate(this),0);},scope:this});}},this);}
this.observationId||this.setIFrameUrl("/observations/obsform/new/summary_id/"+this.target.summaryId.split(".").pop());},deactivate:function(){if(FaultedEarth.Observations.superclass.deactivate.apply(this,arguments)){this.output[0].ownerCt.disable();}},setIFrameUrl:function(url){if(!this.active){return;}
var iFrame=this.output[0].iFrame;var currentUrl=(iFrame.rendered?iFrame.body.dom:iFrame.bodyCfg).src;if(url!=currentUrl){(iFrame.rendered?iFrame.body.dom:iFrame.bodyCfg).src=url;}},updateFilter:function(field,rec){var value=rec.get("name");this.target.mapPanel.map.events.unregister("moveend",this,this.updateBBOX);var filter;switch(value){case"mine":filter=new OpenLayers.Filter.Comparison({property:"summary_id",value:this.target.summaryId.split(".").pop(),type:OpenLayers.Filter.Comparison.EQUAL_TO});break;case"theirs":filter=new OpenLayers.Filter.Comparison({property:"summary_id",value:this.target.summaryId.split(".").pop(),type:OpenLayers.Filter.Comparison.NOT_EQUAL_TO});break;case"orphan":filter=new OpenLayers.Filter.Comparison({property:"summary_id",value:-1,type:OpenLayers.Filter.Comparison.EQUAL_TO});break;case"visible":filter=new OpenLayers.Filter.Spatial({value:this.target.mapPanel.map.getExtent(),type:OpenLayers.Filter.Spatial.BBOX});this.target.mapPanel.map.events.register("moveend",this,this.updateBBOX);break;}
this.filter=filter;this.target.tools[this.featureManager].loadFeatures(filter);},updateBBOX:function(){this.target.tools[this.featureManager].loadFeatures(new OpenLayers.Filter.Spatial({value:this.target.mapPanel.map.getExtent(),type:OpenLayers.Filter.Spatial.BBOX}));}});Ext.preg(FaultedEarth.Observations.prototype.ptype,FaultedEarth.Observations);FaultedEarth.SummaryForm=Ext.extend(gxp.plugins.Tool,{ptype:"app_summaryform",temporaryWorkspace:"temp",temporaryWorkspaceNamespaceUri:"http://geonode.org/temporary",sessionFids:null,autoActivate:false,init:function(target){FaultedEarth.SummaryForm.superclass.init.apply(this,arguments);this.sessionFids=[];var featureManager=target.tools[this.featureManager];featureManager.featureLayer.events.on({"featureselected":function(e){if(!e.feature.fid){return;}
if(featureManager.layerRecord.get("name")=="geonode:fault_section_view"){this.target.summaryId=e.feature.fid;}},"featureunselected":function(e){if(this.active&&featureManager.layerRecord.get("name")=="geonode:fault_section_view"){this.target.summaryId=null;}},scope:this});},addOutput:function(config){return FaultedEarth.SummaryForm.superclass.addOutput.call(this,{xtype:"form",labelWidth:110,defaults:{anchor:"100%"},items:[{xtype:"box",autoEl:{tag:"p",cls:"x-form-item"},html:"Join traces to create a fault section...<br></br><b>Select a fault section in the grid</b> at the bottom of the page to <b>add observations</b>. Filter the grid with the options below."},{xtype:"textfield",ref:"nameContains",fieldLabel:"Search for name",validationDelay:500,listeners:{"valid":this.updateFilter,scope:this}},{xtype:"checkbox",ref:"newFeaturesOnly",hideLabel:true,disabled:true,boxLabel:"Only show grid rows from this session",handler:this.updateFilter,scope:this}],listeners:{"added":function(cmp,ct){ct.on({"expand":function(){this.activate();},"collapse":function(){this.deactivate();},scope:this});},scope:this}});},activate:function(){if(FaultedEarth.SummaryForm.superclass.activate.apply(this,arguments)){var featureManager=this.target.tools[this.featureManager];featureManager.setLayer();if(!this.layerRecord){this.target.createLayerRecord({name:"geonode:fault_section_view",source:"local"},function(record){this.layerRecord=record;featureManager.setLayer(record);},this);}else{featureManager.setLayer(this.layerRecord);}
this.output[0].newFeaturesOnly.setValue(false);this.output[0].nameContains.setValue("");featureManager.on("layerchange",function(mgr,rec){mgr.featureStore.on({"save":function(store,batch,data){var fid;for(var action in data){for(var i=data[action].length-1;i>=0;--i){fid=data[action][i].feature.fid;this.sessionFids.remove(fid);if(action!="destroy"){this.sessionFids.push(fid);}
this.output[0].newFeaturesOnly.setDisabled(!this.sessionFids.length);}}},"load":function(){this.target.summaryId&&window.setTimeout((function(){var feature=mgr.featureLayer.getFeatureByFid(this.target.summaryId);if(feature&&feature.layer.selectedFeatures.indexOf(feature)==-1){feature.layer.selectedFeatures.push(feature);feature.layer.events.triggerEvent("featureselected",{feature:feature});}}).createDelegate(this),0);},scope:this});},this,{single:true});}},deactivate:function(){if(FaultedEarth.SummaryForm.superclass.deactivate.apply(this,arguments)){this.target.tools[this.featureManager].featureStore.un("save",this.monitorSave,this);}},updateFilter:function(){var form=this.output[0];var filters=[];form.newFeaturesOnly.getValue()&&filters.push(new OpenLayers.Filter.FeatureId({fids:this.sessionFids}));form.nameContains.getValue()&&filters.push(new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.LIKE,property:"name",value:"*"+form.nameContains.getValue()+"*",matchCase:false}));var filter;if(filters.length>0){filter=filters.length==1?filters[0]:new OpenLayers.Filter.Logical({type:OpenLayers.Filter.Logical.AND,filters:filters});}
this.target.tools[this.featureManager].loadFeatures(filter);},});Ext.preg(FaultedEarth.SummaryForm.prototype.ptype,FaultedEarth.SummaryForm);FaultedEarth.TraceForm=Ext.extend(gxp.plugins.Tool,{ptype:"app_traceform",temporaryWorkspace:"temp",temporaryWorkspaceNamespaceUri:"http://geonode.org/temporary",sessionFids:null,autoActivate:false,init:function(target){FaultedEarth.TraceForm.superclass.init.apply(this,arguments);this.sessionFids=[];var featureManager=target.tools[this.featureManager];featureManager.featureLayer.events.on({"featureselected":function(e){if(!e.feature.fid){return;}
if(featureManager.layerRecord.get("name")=="geonode:trace"){this.target.summaryId=e.feature.fid;}},"featureunselected":function(e){if(this.active&&featureManager.layerRecord.get("name")=="geonode:trace"){this.target.summaryId=null;}},scope:this});},addOutput:function(config){return FaultedEarth.TraceForm.superclass.addOutput.call(this,{xtype:"form",labelWidth:110,defaults:{anchor:"100%"},items:[{xtype:"container",layout:"hbox",cls:"composite-wrap",fieldLabel:"Create or edit a trace",items:[{id:this.id+"_tooltarget",xtype:"container",cls:"toolbar-spaced",layout:"toolbar"}]},{xtype:"container",layout:"hbox",cls:"composite-wrap",fieldLabel:"Upload a trace",items:[{xtype:"button",text:"Import",iconCls:"icon-import",handler:function(){var featureManager=this.target.tools[this.featureManager];if(this.output[0].newFeaturesOnly.getValue()){featureManager.on("clearfeatures",this.showUploadWindow,this,{single:true});featureManager.clearFeatures();}else{this.showUploadWindow();}},scope:this}]},{xtype:"box",autoEl:{tag:"p",cls:"x-form-item"},html:"<b>Select a trace in the grid</b> at the bottom of the page to <b>add observations</b>. Filter the grid with the options below."},{xtype:"textfield",ref:"nameContains",fieldLabel:"Search for name",validationDelay:500,listeners:{"valid":this.updateFilter,scope:this}},{xtype:"checkbox",ref:"newFeaturesOnly",hideLabel:true,disabled:true,boxLabel:"Only show grid rows from this session",handler:this.updateFilter,scope:this}],listeners:{"added":function(cmp,ct){ct.on({"expand":function(){this.activate();},"collapse":function(){this.deactivate();},scope:this});},scope:this}});},activate:function(){if(FaultedEarth.TraceForm.superclass.activate.apply(this,arguments)){var featureManager=this.target.tools[this.featureManager];featureManager.setLayer();if(!this.layerRecord){this.target.createLayerRecord({name:"geonode:trace",source:"local"},function(record){this.layerRecord=record;featureManager.setLayer(record);},this);}else{featureManager.setLayer(this.layerRecord);}
this.output[0].newFeaturesOnly.setValue(false);this.output[0].nameContains.setValue("");featureManager.on("layerchange",function(mgr,rec){mgr.featureStore.on({"save":function(store,batch,data){var fid;for(var action in data){for(var i=data[action].length-1;i>=0;--i){fid=data[action][i].feature.fid;this.sessionFids.remove(fid);if(action!="destroy"){this.sessionFids.push(fid);}
this.output[0].newFeaturesOnly.setDisabled(!this.sessionFids.length);}}},"load":function(){this.target.summaryId&&window.setTimeout((function(){var feature=mgr.featureLayer.getFeatureByFid(this.target.summaryId);if(feature&&feature.layer.selectedFeatures.indexOf(feature)==-1){feature.layer.selectedFeatures.push(feature);feature.layer.events.triggerEvent("featureselected",{feature:feature});}}).createDelegate(this),0);},scope:this});},this,{single:true});}},deactivate:function(){if(FaultedEarth.TraceForm.superclass.deactivate.apply(this,arguments)){this.target.tools[this.featureManager].featureStore.un("save",this.monitorSave,this);}},updateFilter:function(){var form=this.output[0];var filters=[];form.newFeaturesOnly.getValue()&&filters.push(new OpenLayers.Filter.FeatureId({fids:this.sessionFids}));form.nameContains.getValue()&&filters.push(new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.LIKE,property:"name",value:"*"+form.nameContains.getValue()+"*",matchCase:false}));var filter;if(filters.length>0){filter=filters.length==1?filters[0]:new OpenLayers.Filter.Logical({type:OpenLayers.Filter.Logical.AND,filters:filters});}
this.target.tools[this.featureManager].loadFeatures(filter);},showUploadWindow:function(){var uploadWindow=new Ext.Window({title:"Import Faults",width:250,autoHeight:true,modal:true,items:[{xtype:"form",ref:"form",padding:10,border:false,autoHeight:true,labelWidth:40,defaults:{anchor:"100%"},items:[{xtype:"box",autoEl:{tag:"p",cls:"x-form-item"},html:"<b>Select a zipped shapefile for uploading.</b> The shapefile needs to have a line geometry."},{xtype:"fileuploadfield",ref:"fileField",fieldLabel:"File",allowBlank:false,listeners:{"fileselected":function(field,file){field.ownerCt.uploadButton.enable();}}}],buttonAlign:"center",buttons:[{text:"Upload",ref:"../uploadButton",disabled:true,handler:function(){var file=uploadWindow.form.fileField.fileInput.dom.files[0];Ext.Ajax.request({method:"PUT",url:this.target.localGeoServerUrl+"rest/workspaces/"+
this.temporaryWorkspace+"/datastores/"+
file.fileName+"/file.shp?update=overwrite",xmlData:file,headers:{"Content-Type":file.fileName.split(".").pop().toLowerCase()=="zip"?"application/zip":file.type},success:this.handleUpload.createDelegate(this,[file.fileName,uploadWindow],true),scope:this});},scope:this}]}]});uploadWindow.show();},handleUpload:function(response,options,fileName,uploadWindow){uploadWindow.close();var fileParts=fileName.split(".");fileParts.pop();var layerName=fileParts.join("");new OpenLayers.Protocol.WFS({version:"1.1.0",srsName:this.target.mapPanel.map.getProjectionObject().getCode(),url:this.target.localGeoServerUrl+"wfs",featureType:layerName,featureNS:this.temporaryWorkspaceNamespaceUri,outputFormat:"GML2"}).read({callback:function(response){var extent=new OpenLayers.Bounds();var features=response.features,feature,date;for(var i=features.length-1;i>=0;--i){feature=features[i];extent.extend(feature.geometry.getBounds());feature.fid=null;feature.state=OpenLayers.State.INSERT;for(var a in feature.attributes){date=Date.parseDate(feature.attributes[a],"Y/m/d");if(date){feature.attributes[a]=date.format("c");}}}
var featureManager=this.target.tools[this.featureManager];featureManager.featureLayer.addFeatures(features);featureManager.featureStore.save();var featureEditor=this.target.tools[this.featureEditor];featureEditor.actions[1].control.activate();this.target.mapPanel.map.zoomToExtent(extent);},scope:this});}});Ext.preg(FaultedEarth.TraceForm.prototype.ptype,FaultedEarth.TraceForm);