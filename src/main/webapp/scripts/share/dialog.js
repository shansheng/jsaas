
/**
 * 打开数据源对话框。
 * @param callBack
 *  callBack ：数据格式为
 *  {
 *  	alias:"数据源别名",
 *  	name:"数据源显示名称"
 *  }
 */
function openDatasourceDialog(callBack){
	var url=__rootPath+"/sys/core/sysDatasource/dialog.do";
	mini.open({
		url : url,
		title : "选择数据源",
		width : 650,
		height : 480,
		ondestroy : function(action) {
			if(action != "ok") return;
			var iframe = this.getIFrameEl();
			var data = iframe.contentWindow.GetData();
			data = mini.clone(data); //必须
			if (data && callBack) {
				callBack(data);
			}
		}
	});
}


/**
 * 打开自定义查询对话框。
 * @param callBack
 *  callBack ：数据格式为
 *  {
 *  	alias:"数据源别名",
 *  	name:"数据源显示名称"
 *  }
 */
function openCustomQueryDialog(callBack){
	var url=__rootPath+"/sys/db/sysDbSql/dialog.do";
	mini.open({
		url : url,
		title : "选择自定义SQL",
		width : 800,
		height :580,
		ondestroy : function(action) {
			if (action != "ok") return;
			var iframe = this.getIFrameEl();
			var data = iframe.contentWindow.GetData();
			data = mini.clone(data); 
			if (data && callBack) {
				callBack(data);
			}
		}
	});
}

/**
 * 选择解决方案对话框。
 * @param single	是否单选
 * @param callBack	回调函数(参数类型为bpmsolution数组)
 * {name:"",key:"",solId:""}
 */
function openBpmSolutionDialog(single,callBack){
	var strSingle=single?"true":"false";
	_OpenWindow({
		url: __rootPath + "/bpm/core/bpmSolution/dialog.do?single="+strSingle,
        title: "选择方案", width: "800", height: "600",
        ondestroy: function(action) {
        	if(action!="ok") return ;
       		var iframe = this.getIFrameEl().contentWindow;
           	var solutions=iframe.getSolutions();
           	if(callBack){
           		callBack(solutions)
           	}
        }
	});
}

/**
 * bo模型选择。
 * @param supportType db,all,json
 * @param callBack
 * @param multi 是否多选
 */
function openBoDefDialog(supportType,callBack,multi){
	var url=__rootPath+'/sys/bo/sysBoDef/dialog.do';
	if(supportType=="db" || supportType=="all"){
		//url+="?Q_SUPPORT_DB__S_EQ=yes";
	}
	var tmp=(multi)?"true":"false";
	if(url.indexOf("?")==-1){
		url+="?multi=" + tmp;
	}
	else{
		url+="&multi=" + tmp;
	}
	
	_OpenWindow({
		url:url,
		height:450,
		width:800,
		title:'业务模型选择',
		ondestroy:function(action){
			if(action=='cancel')return;
			var iframe = this.getIFrameEl();
            var bodefs = iframe.contentWindow.getBoDefs();
            if(callBack){
            	if(bodefs.length>0){
            		if(tmp=="true"){
            			callBack(action, bodefs);
            		}
            		else{
            			callBack(action, bodefs[0]);
            		}
            	}
            }
            else{
            	alert(bodefs);
            }
		}
	});
}

/**
 * 打开表单选择对话框
 * @param conf
 * single:是否单选
 * callBack:回调方法(参数为formView数组对象)
 * bodefId :bo定义ID
 */
function openBpmFormViewDialog(conf){
	var single=conf.single?"true":"false";
	var bodefId=conf.bodefId;
	var url=__rootPath+'/bpm/form/bpmFormView/dialog.do?single='+ single;
	//如果选择bo定义。
	if(bodefId){
		url+='&boDefIds=' +bodefId;
	}
	_OpenWindow({
		url:url,
		height:400,
		width:780,
		title:'表单视图对话框',
		ondestroy:function(action){
			if(action!='ok')return;
			var formView=this.getIFrameEl().contentWindow.getFormView();
			if(conf.callBack){
				conf.callBack(formView);
			}
		}
	});
}

/**
 * 打开手机对话框。
 * @param conf
 * @returns
 */
function openBpmMobileFormDialog(conf){
	var single=conf.single?"true":"false";
	var bodefId=conf.bodefId;
	var url=__rootPath+'/bpm/form/bpmMobileForm/dialog.do?single='+ single;
	//如果选择bo定义。
	if(bodefId){
		url+='&boDefIds=' +bodefId;
	}
	_OpenWindow({
		url:url,
		height:400,
		width:780,
		title:'手机表单选择对话框',
		ondestroy:function(action){
			if(action!='ok')return;
			var formView=this.getIFrameEl().contentWindow.getFormView();
			if(conf.callBack){
				conf.callBack(formView);
			}
		}
	});
}

/**
 * icon选择器
 * 用法示例,
 * _IconSelectDlg(function(icon){
			console.log(icon);
		});
 * */
function _IconSelectDlg(callback,type){
	var url=__rootPath+'/sys/core/file/iconSelectDialog.do';
	if(type){
		url+="?type=" + type;
	}
	_OpenWindow({
		url:url,
		height:340,
		width:506,
		iconCls:'icon-user',
		title:'图标选择',
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var icon = iframe.contentWindow.getIcon();
            if(callback){
            	callback.call(this,icon);
            }
		}
	});
}


/**
 * 通用的buttonedit清除事件处理。
 * @param e
 */
function clearButtonEdit(e){
	var btn=e.sender;
	btn.setValue("");
	btn.setText("");
}

/**
 * 打开流程图对话框。
 * @param conf
 * {
 * 	solId:"",
 * 	actDefId:""
 * }
 */
function openFlowChartDialog(conf){
	var url=__rootPath+"/bpm/core/bpmInst/flowChart.do";
	if(conf.solId){
		url+="?solId="+conf.solId;
	}
	else if(conf.actDefId){
		url+="?actDefId="+conf.actDefId;
	}
	
	
	_OpenWindow({
		url : url,
		title : "流程图对话框",
		width : 650,
		height : 480,
		max:true
	});
}

/**
 * 打开profile对话框。
 * @param conf	
 * conf :{
 * 	onload:初始化函数处理，参数iframe
 * 	onOk: 点击ok处理。
 *  hideRadio:YES 是否隐藏RADIO。
 * }
 * @returns
 */
function openProfileDialog(conf){
	var hideRadio=conf.hideRadio;
	var url=__rootPath + "/sys/core/public/profileDialog.do";
	if(hideRadio=="YES"){
		url+="?hideRadio=YES";
	}
	_OpenWindow({
		url: url,
        title: "权限配置", width: "800", height: "600",
        onload:function(){
        	var iframe = this.getIFrameEl().contentWindow;
        	if(conf.onload){
        		conf.onload(iframe);
        	}
        },
        ondestroy: function(action) {
        	if(action!="ok") return;
        	var iframe = this.getIFrameEl().contentWindow;
        	if(conf.onOk){
        		conf.onOk(iframe.getData());
        	}
        }
	});
}

/**
 * 根据解决方案Id 获取对应的流程节点对话框。
 * @param solId
 * @param callback
 * @returns
 */
function openSolutionNode(actDefId,conf,callback){
	var url=__rootPath + "/bpm/core/bpmSolution/nodeDialog.do?actDefId="+ actDefId;
	url+="&single="+conf.single;
	var end="false";
	if(conf.end){
		end=conf.end;
	}
	var start="false";
	if(conf.start){
		start=conf.start;
	}
	url+="&end=" + end;
	url+="&start=" + start;
	
	_OpenWindow({
		url: url,
        title: "选择流程节点", width: "800", height: "600",
        onload:function(){
        	var iframe = this.getIFrameEl().contentWindow;
        	if(conf.onload){
        		conf.onload(iframe);
        	}
        },
        ondestroy: function(action) {
        	if(action!="ok") return;
        	var iframe = this.getIFrameEl().contentWindow;
        	if(callback){
        		callback(iframe.getData());
        	}
        }
	}); 
}

/**
 * 打开数据源对话框。
 * @param callBack
 *  callBack ：数据格式为
 *  {
 *  	alias:"数据源别名",
 *  	name:"数据源显示名称"
 *  }
 */
function openDicDialog(conf){
	var url=__rootPath+"/sys/core/sysDic/dialog.do";
	var single=conf.single?"true":"false";
	url+="?single=" +single;
	mini.open({
		url : url,
		title : "选择数据字典",
		width : 300,
		height : 480,
		ondestroy : function(action) {
			if(action != "ok") return;
			var iframe = this.getIFrameEl();
			var data = iframe.contentWindow.getData();
			data = mini.clone(data); //必须
			if (data && conf.callBack) {
				conf.callBack(data);
			}
		}
	});
}


/**
 * 打开实体选择框。
 * @param conf
 * {
 * 	single:true 或false
 *  supportDb: 是否支持数据库 (yes or no)
 *  callBack : 回调方法
 * }
 * @returns
 */
function openBoEntDialog(conf){
	var url=__rootPath+"/sys/bo/sysBoEnt/dialog.do";
	var single=conf.single?"true":"false";
	url+="?single=" +single;
	url+="&Q_GEN_TABLE__S_EQ="+conf.supportDb;
	mini.open({
		url : url,
		title : "选择Bo实体",
		width : 800,
		height : 600,
		ondestroy : function(action) {
			if(action != "ok") return;
			var iframe = this.getIFrameEl();
			var data = iframe.contentWindow.getData();
			data = mini.clone(data); //必须
			if (data && conf.callBack) {
				conf.callBack(data);
			}
		}
	});
}

/**
 * 选择模版
 * @param conf
 * {
 * 	category:onetoone,
 * 	type:pc,
 * 	callBack:function(data){
 * 	}
 * }
 * @returns
 */
function openSelTemplate(conf){
	var url=__rootPath+"/bpm/form/bpmFormTemplate/selTemplate.do?category=" + conf.category +"&type=" + conf.type;
	
	mini.open({
		url : url,
		title : "选择模版",
		width : 400,
		height : 200,
		ondestroy : function(action) {
			if(action != "ok") return;
			var iframe = this.getIFrameEl();
			var data = iframe.contentWindow.getData();
			data = mini.clone(data); //必须
			if (data && conf.callBack) {
				conf.callBack(data);
			}
		}
	});
}


/**
 * 打开字段选择对话框。
 * @param conf
 * {
 * 	solId:"解决方案ID",
 * 	nodeId:节点ID
 * 	actDefId:"流程定义ID"
 * 	callback:回调方法
 * }
 * @returns
 */
function openFieldDialog(conf){
	_OpenWindow({
		title:'选择表单字段',
		height:450,
		width:680,
		url:__rootPath+'/bpm/core/bpmSolution/modelFieldsDlg.do?solId='+conf.solId+'&nodeId='+conf.nodeId+'&actDefId='+conf.actDefId,
		ondestroy:function(action){
			if(action!='ok') return;
			var iframe=this.getIFrameEl();
			var fields=iframe.contentWindow.getSelectedFields();
			if(conf.callback){
				conf.callback(fields);
			}
		}
	});
}

/**
 * 打开word预览。
 * @param alias
 * @param id
 * @returns
 */
function previewWord(alias,id){
	var wh= getWindowSize();
	var url=__rootPath +"/sys/core/sysWordTemplate/preview/"+alias+"/"+id+".do";
	_OpenWindow({
		    url: url, 
			title: "WORD预览",
			width: wh.width, 
			height: wh.height,
         ondestroy: function(action) {
         }
 	});
}

/**
 * 打开word预览。
 * @param e
 * @returns
 */
function _BtnPreviewWord(e){
	var btn=e.sender;
	var el=btn.el;
	var parent=$(el).closest(".form-model");
	var val=mini.getByName("ID_", parent[0]).getValue();
	if(!val) return;
	previewWord(btn.alias,val);
}

/**
 * 打开word模版。
 * @param conf 
 * {
 * 	single:true,
 * 	callback:function(data){
 *   }
 * }
 * @returns
 */
function openWordTemplateDialog(conf){
	_OpenWindow({
		title:'选择WORD模版',
		height:450,
		width:680,
		url:__rootPath+'/sys/core/sysWordTemplate/dialog.do?single=' + conf.single,
		ondestroy:function(action){
			if(action!='ok') return;
			var iframe=this.getIFrameEl();
			var fields=iframe.contentWindow.getSelectedFields();
			if(conf.callback){
				conf.callback(fields);
			}
		}
	});
}


/**
 * config的参数有：
 * types:Document,Icon,Image,Zip,Vedio
 * from:APP,
 * callback:function(files){
 * 	fileId,path
 * }
 * 
 */
function _FileUploadDlg(config) {
    var url = __rootPath+"/sys/core/sysFile/dialog.do";
    
    _OpenWindow({
        url: url,
        title: "上传文件", width: 600, height: 420,
        onload: function() {
        },
        ondestroy: function(action) {
            if (action == 'ok') {
                var iframe = this.getIFrameEl();
                var files = iframe.contentWindow.getFiles();
                if (config.callback) {
                    config.callback.call(this, files);
                }
            }
        }
    });
}

//用户对话框带条件
function _UserDialog(conf){
	var config={
		single:false,
		showDimId:true,
		showTenant:false
	};
	var users=conf.users || [];
	var tenantId=conf.tenantId || '';
	var groupId=conf.orgid || '';
	var dimId=groupId!=''?'1':conf.initDim || '';
	
	jQuery.extend(config,conf);

	_OpenWindow({
		url:__rootPath+'/sys/org/osUser/dialog.do?single='+config.single +'&showTenant='+config.showTenant+'&showDimId='+config.showDimId+'&tenantId='+tenantId+'&groupId='+groupId+'&dimId='+dimId,
		height:450,
		width:1080,
		iconCls:'icon-user-dialog',
		title:'用户选择',
		onload:function(){
			var iframe = this.getIFrameEl();
			iframe.contentWindow.setConfig(config);
			if(users.length>0){
				iframe.contentWindow.init(users);
			}
		},
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var users = iframe.contentWindow.getUsers();
            if(config.callback){
            	if(config.single && users.length>0){
            		config.callback.call(this,users[0]);
            	}else{
            		config.callback.call(this,users);
            	}
            }
		}
	});
}

/**
 * 用户选择框
 * @param single
 * @param callback 回调函数，返回选择的用户信息，当为单选时，
 * 返回单值，当为多选时，返回多个值
 */
function _UserDlg(single,callback,range){
	//是否限定用户范围
	if(range){
		_TenantRangeUserDlg('',single,callback,range);
	}else{
		var conf={
			single:single,
			callback:callback
		};
		_UserDialog(conf);
		//_TenantUserDlg('',single,callback);
	}

}

/**
 * 按租用机构进行用户选择
 * @param tenantId 当前用户为指定的管理机构下的用户,才可以查询到指定的租用机构下的用户
 * @param single
 * @param callback 回调函数，返回选择的用户信息，当为单选时，
 * 返回单值，当为多选时，返回多个值
 */
function _TenantUserDlg(tenantId,single,callback){
	var conf={
			single:single,
			tenantId:tenantId,
			callback:callback
		};
	_UserDialog(conf);
	/*_OpenWindow({
		url:__rootPath+'/sys/org/osUser/dialog.do?single='+single+'&tenantId='+tenantId,
		height:450,
		width:1080,
		iconCls:'icon-user-dialog',
		title:'用户选择',
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var users = iframe.contentWindow.getUsers();
            if(callback){
            	if(single && users.length>0){
            		callback.call(this,users[0]);
            	}else{
            		callback.call(this,users);
            	}
            }
		}
	});*/
}

/**
 * 按租户机构、维度、等级筛选
 * @param range
 * @param tenantId
 * @param single
 * @param callback
 * @private
 */
function _TenantRangeUserDlg(tenantId,single,callback,range){
	var conf={
			single:single,
			tenantId:tenantId,
			initDim:range.initDim,
			initRankLevel:range.initRankLevel,
			callback:callback
		};
	_UserDialog(conf);
	/*_OpenWindow({
		url:__rootPath+'/sys/org/osUser/rangeDialog.do?single='+single+'&tenantId='+tenantId + '&initDim=' + range.initDim + '&initRankLevel=' + range.initRankLevel,
		height:450,
		width:1080,
		iconCls:'icon-user-dialog',
		title:'用户选择',
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
			var users = iframe.contentWindow.getUsers();
			if(callback){
				if(single && users.length>0){
					callback.call(this,users[0]);
				}else{
					callback.call(this,users);
				}
			}
		}
	});*/
}


/**
 * 部门选择器
 * @param single
 * @param config
 * @param callback
 */
function _DepDlg(single,config,callback){	
	_InitDepData('',single,config,'1',callback,false,null);
}


function _DepDlgFromIds(e,single,config,callback){
	_InitDepData('',"true",config,'1',callback,false,e);
}	

/**
 * 用户组选择框（查询当前租户下的用户）
 * @param single 是否单选择
 * @param callback 回调
 * @param reDim  回调是否需要返回维度ID,可不选择
 */
function _GroupDlg(single,callback,reDim){
	if(!reDim){
		reDim=false;
	}
	_TenantGroupDlg('',single,'','',callback,reDim);
}

/**
 * 显示某一维度下的用户组选择框（查询当前租户下的用户）
 * @param single
 * @param dimId 显示维度下的用户组
 * @param callback
 */
function _GroupSingleDim(single,dimId,callback){
	_TenantGroupDlg('',single,'',dimId,callback,false);
}

/**
 * 去除行政维度下的用户组
 * @param conf
 */
function _GroupCanDlg(conf){
	var config={};
	$.extend(config,conf);
	//去除行政维度下的用户
	conf.excludeAdmin=true;
	conf.showDimId=false;
	_SaasGroupDlg(conf);
}

/**
 * SAAS级的用户组选择框
 * @param conf
 * tenantId 当前用户为指定的管理机构下的用户,才可以查询到指定的租用机构下的用户
 * single  是否单选
 * showDimId 维度Id，传入后，则只显示该维度的用户组
 * callback  callback
 * excludeAdmin 排除行政维度
 * reDim  必须返回维度选择
 */
function _SaasGroupDlg(conf){
	var title=conf.title;
	if(!title && conf.showDimId=='1'){
		title='部门选择';
	}
	if(!conf.excludeAdmin){
		conf.excludeAdmin='';
	}
	
	if(!conf.width){
		conf.width=840;
	}
	if(!conf.height){
		conf.height=450;
	}
	_OpenWindow({
		iconCls:'icon-group-dialog',
		url:__rootPath+'/sys/org/osGroup/dialog.do?single='+conf.single+'&reDim='+conf.reDim+'&showDimId='+conf.showDimId+'&tenantId='+conf.tenantId +'&excludeAdmin='+conf.excludeAdmin,
		height:conf.height,
		width:conf.width,
		title:title,
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var groups = iframe.contentWindow.getGroups();
            var dim={};
            //需要返回dim
            if(conf.reDim){
            	var dimNode=iframe.contentWindow.getSelectedDim();
	            dim={
            		dimId:dimNode.dimId,
            		dimKey:dimNode.dimKey,
            		name:dimNode.name
	            };
            }
            if(conf.callback){
            	if(conf.single && groups.length==1){
            		conf.callback.call(this,groups[0],dim);
            	}else{
            		conf.callback.call(this,groups,dim);
            	}
            }
		}
	});
}

/**
 * 用户组选择框（查询指定的租户下的用户）
 * @param tenantId 当前用户为指定的管理机构下的用户,才可以查询到指定的租用机构下的用户
 * @param single 是否单选
 * @param config 选择框配置
 * @param showDimId 维度Id，传入后，则只显示该维度的用户组
 * @param callback 
 * @param reDim 必须返回维度选择
 */
function _TenantGroupDlg(tenantId,single,config,showDimId,callback,reDim){
	
	var title='用户组选择';
	if(showDimId=='1'){
		title='部门选择';
		
		
	}
	if(!config){
		config = "";
	}
	
	
	_OpenWindow({
		iconCls:'icon-group-dialog',
		url:__rootPath+'/sys/org/osGroup/dialog.do?single='+single+'&reDim='+reDim+'&showDimId='+showDimId+'&tenantId='+tenantId+'&config=' + config,
		height:480,
		width:930,
		title:title,
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var groups = iframe.contentWindow.getGroups();
            
            var dim={};
            //需要返回dim
            if(reDim){
            	var dimNode=iframe.contentWindow.getSelectedDim();
	            dim={
	            		dimId:dimNode.dimId,
	            		dimKey:dimNode.dimKey,
	            		name:dimNode.name
	            };
            }
            if(callback){
            	if(single && groups.length==1){
            		callback.call(this,groups[0],dim);
            	}else{
            		callback.call(this,groups,dim);
            	}
            }
		}
	});
}




function _InitDepData(tenantId,single,config,showDimId,callback,reDim,targetEL){
	var url=__rootPath+'/sys/org/osGroup/initDialog.do?single='+single+'&config=' + config;
	url=encodeURI(url);
	_OpenWindow({
		iconCls:'icon-group-dialog',
		url:url,
		height:480,
		width:930,
		title:"部门选择对话框",
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var groups = iframe.contentWindow.getGroups();
            console.info(groups);
            data = mini.clone(groups);
            var dim={};
            //需要返回dim
            if(reDim){
            	var dimNode=iframe.contentWindow.getSelectedDim();
	            dim={
	            		dimId:dimNode.dimId,
	            		dimKey:dimNode.dimKey,
	            		name:dimNode.name
	            };
            }
            if(callback){
            	if(single && groups.length==1){
            		callback.call(this,groups[0],dim);
            	}else{
            		callback.call(this,groups,dim);
            	}
            }
            
            if(targetEL){
            	var text = "";
            	var value = "";            	
            	for(var i = 0, j = data.length; i<j ; i++){           		
            		text += data[i].name + ",";
            		value += data[i].groupId + ",";            		
            	}
            	text = text.substring(0,text.length-1);
            	value = value.substring(0,value.length-1);
            	targetEL.sender.setValue(value);
            	targetEL.sender.setText(text);
            }
		}
	});
	
}


/**
 * 显示图片对框架
 * 
 * @param config
 * {
 * 	  from:来自个人的上传图片（值为：SELF），来自应用程序(值为：APPLICATION)
 *    single:单选择(true),复选(false)
 *    callback:回调函数，当选择ok，则可以通过回调函数的参数获得选择的图片
 * }
 */
function _ImageDlg(config){
	
	if(!config.width) config.width=620;
	
	if(!config.height) config.height=450;
	
	var win=mini.open({
        allowResize: true, //允许尺寸调节
        allowDrag: true, //允许拖拽位置
        showCloseButton: true, //显示关闭按钮
        showMaxButton: true, //显示最大化按钮
        showModal: true,
        //from=SELF代表来自个人的图片，single代表只允许上传一张
        url: __rootPath+"/sys/core/sysFile/appImages.do?from="+config.from+"&single="+config.single,
        title: "选择图片", 
        width: config.width, 
        height: config.height,
        onload: function() {
			
        },
        ondestroy: function(action) {
            if (action != 'ok') return;
            var iframe = this.getIFrameEl();
            var imgs = iframe.contentWindow.getImages();
            if(config && config.callback){
                config.callback.call(this,imgs);
            }
        }
    });

    var flag=false;
    var el = win.getHeaderEl();
    $(el).dblclick(function () {
        if (!flag) {
            win.max();
            mini.layout();
            flag = true;
        } else {
            win.restore();
            flag = false;
        }
    });
}

/**
 * 预览原图
 * @param fileId
 */
function _ImageViewDlg(fileId){
	var win=mini.open({
        allowResize: true, //允许尺寸调节
        allowDrag: true, //允许拖拽位置
        showCloseButton: true, //显示关闭按钮
        showMaxButton: true, //显示最大化按钮
        showModal: true,
        //只允许上传图片，具体的图片格式配置在config/fileTypeConfig.xml
        url: __rootPath+"/sys/core/sysFile/imgPreview.do?fileId="+fileId,
        title: "图片预览", width: 600, height: 420,
        onload: function() {
        },
        ondestroy: function(action) {
        }
    });
	win.max();
}

/**
 * 显示个人的对话框
 * @param single 是否为单选图片
 * @param callback 回调函数
 */
function _UserImageDlg(single,callback){
	var config={
		single:single,
		callback:callback,
		from:'SELF'
	};
	_ImageDlg(config);
}

/**
 * 显示应用级别的图片对话框
 * @param single
 * @param callback
 */
function _AppImageDlg(single,callback){
	var config={
		single:single,
		callback:callback,
		from:'APPLICATION'
	};
	_ImageDlg(config);
}


function _ShowUserEditor(userId){
	_OpenWindow({
		title:'编辑用户信息',
		url:__rootPath+'/sys/org/osUser/edit.do?pkId='+userId,
		height:450,
		width:780,
		onload:function(){
			
		}
	});
}

/**
 * 显示我的文件上传对话框
 * @param config
 * 		  showMgr:true 是否显示管理界面
 *        from：SELF,APPLICATION
 *        types： Image,Document,Zip,Vedio
 *        single： true,false单选或多选
 *        callback： 回调函数
 */
function _UploadFileDlg(config){
	if(config.showMgr){
		_OpenWindow({
			title:'我的附件管理器',
			height:500,
			width:820,
			url:__rootPath+'/sys/core/sysFile/myMgr.do?dialog=true&single='+config.single,
			ondestroy:function(action){
				if (action != 'ok') return;
	            var iframe = this.getIFrameEl();
	            var files = iframe.contentWindow.getFiles();
	            if(config.callback){
	                config.callback.call(this,files);
	            }
			}
		});
	}else{
		_UploadDialogShowFile({
			onlyOne:config.onlyOne,
			from:config.from,
			types:config.types,
			callback:config.callback,
			single:config.single,
			title:config.title
		});
	}
}

/**
 * 流程解决方案对话框
 * @param single
 * @param callback
 */
function _BpmSolutionDialog(single,callback){
	_OpenWindow({
		url:__rootPath+'/bpm/core/bpmSolution/dialog.do?single='+single,
		title:'流程解决方案选择',
		height:600,
		width:800,
		iconCls:'icon-flow',
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var sols = iframe.contentWindow.getSolutions();
            if(callback){
            	callback.call(this,sols);
            }
		}
	});
}

/**
 * 上传对话框
 * @param config
 *       from:SELF,APPLICATION
 *       types:Image,Document,Zip,Vedio
 *       callback
 */
function _UploadDialog(config){
 	_OpenWindow({
        //只允许上传图片，具体的图片格式配置在config/fileTypeConfig.xml
        url: __rootPath+"/sys/core/sysFile/webUploader.do?from="+config.from+"&types="+config.types,
        title: "文件上传", 
        width: 400,
        height: 420,
        onload: function() {
			
        },
        ondestroy: function(action) {
            if (action != 'ok') return;
            var iframe = this.getIFrameEl();
            var files = iframe.contentWindow.getFiles();
            
            if(config.callback){
                config.callback.call(this,files);
            }
        }
    });
}





/**
 * 上传对话框
 * @param config
 *       from:SELF,APPLICATION
 *       types:Image,Document,Zip,Vedio
 *       callback
 */
function _UploadDialogShowFile(config){
	if(!config.title) config.title="附件上传";
	var congfigStr = mini.encode(config);
	var url=__rootPath+"/sys/core/sysFile/webUploader.do?config="+congfigStr;
	
	url=encodeURI(url);
	
 	_OpenWindow({
        //只允许上传图片，具体的图片格式配置在config/fileTypeConfig.xml
        url:url,
        title: config.title, 
        width: 600,
        height: 420,
        onload: function() {
			
        },
        ondestroy: function(action) {
            if (action != 'ok') return;
            var iframe = this.getIFrameEl();
            var files = iframe.contentWindow.getFiles();
            if(config.callback){
                config.callback.call(this,files);
            }
        }
    });
}

/**
 * 用户选择按钮点击事件
 * 
 * @param e
 */
function _RelatedSolutionButtonClick(EL,config){
	var relatedSolutionSel=EL;
	var chooseitem=relatedSolutionSel.chooseitem;
	var flag=chooseitem=="single"?"false":"true";
	_OpenWindow({
		url: __rootPath+"/bpm/core/bpmInst/dialog.do?flag="+flag+"&solId="+relatedSolutionSel.solution,
        title: "选择实例",
        width: 980, height: 750,
        ondestroy: function(action) {
            if (action == 'ok') {
            	var iframe = this.getIFrameEl();
            	var instances=iframe.contentWindow.getInstances();
            	if(config.callback){
                    config.callback.call(this,instances);
                }
            }
        }
	});
}

/**
 * 打开office文档。
 * @param fileId
 * @returns
 */
function _openDoc(fileId){
	var url=__rootPath +"/scripts/customer/doc.jsp?fileId=" + fileId;
	openNewWindow(url,"officeDoc");
}  

/**
 * 打开pdf文档。
 * @param fileId
 * @returns
 */
function _openPdf(fileId){
	var url=__rootPath+'/scripts/PDFShow/web/viewer.html?file='+
	__rootPath+'/sys/core/file/download/'+fileId+'.do';
	openNewWindow(url,"officePdf");
}

/**
 * 打开图片。
 * @param fileId
 * @returns
 */
function _openImg(fileId){
	var url=__rootPath+'/scripts/customer/img.jsp?fileId='+fileId;
	openNewWindow(url,"officeIMG");
}


function _ShowTenantInfo(instId){
	_OpenWindow({
		title:'机构信息',
		iconCls:'icon-group',
		height:480,
		width:780,
		url:__rootPath+'/sys/core/sysInst/get.do?pkId='+instId
	});
}

function _ShowUserInfo(userId){
	_OpenWindow({
		title:'用户信息',
		iconCls:'icon-user',
		height:480,
		width:780,
		url:__rootPath+'/sys/org/osUser/get.do?pkId='+userId
	});
}

function _ShowGroupInfo(groupId){
	_OpenWindow({
		title:'用户组信息',
		iconCls:'icon-group',
		height:480,
		width:780,
		url:__rootPath+'/sys/org/osGroup/detail.do?groupId='+groupId
	});
}

/**
 * 显示审批明细
 */
function _ShowBpmInstInfo(instId){
	var url=__rootPath+'/bpm/core/bpmInst/inform.do?instId='+ instId;
	window.open(url);
}


/**
 * 选择数据库表。
 * @param dsAlias
 * @param callBack
 * @returns
 */
function openTableDialog(dsAlias,callBack) {
	var url = __rootPath+ "/sys/db/sysDb/tableDialog.do?ds=" + dsAlias;
	mini.open({
		url : url,
		title : "选择表",
		width : 650,
		height : 380,
		ondestroy : function(action) {
			if (action != "ok") return;
			var iframe = this.getIFrameEl();
			var data = iframe.contentWindow.GetData();
			data = mini.clone(data); //必须
			if(callBack){
				callBack(data);
			}
		}
	});
}

/**
 * 打开分享链接。
 * @param url
 * @returns
 */
function openShareDialog(url,needCode){
	var url = __rootPath+ "/pub/share/shareUrl.do?url=" + url +"&needCode=" + needCode;
	mini.open({
		url : url,
		title : "分享链接",
		width : 700,
		height : 380
	});
}


/**
 * 打开发布菜单窗口。
 * {
 * 	name:"",
 * 	key:"",
 * 	url:"",
 *  boListId:"",
 *  showMobileIcon:true,false
 * }
 * @param row
 * @returns
 */
function openDeploymenuDialog(row){
	row.boListId=row.boListId || "";
	_OpenWindow({
		title:'发布菜单 ',
		height:550,
		width:800,
		url:__rootPath+"/sys/core/sysMenu/addNode.do",
		onload:function(){
			var win=this.getIFrameEl().contentWindow;
			win.setData({
				name:row.name,
				key:row.key,
				parentId:'',
				url:row.url,
				showType:'URL',
				isBtnMenu:'NO',
				boListId:row.boListId,
				showMobileIcon:row.showMobileIcon
			});
		}
	});

}

function openBpmOpinionsDialog(actInstId){
	var url=__rootPath+"/bpm/core/bpmInst/opinions.do?actInstId="+ actInstId;
	_OpenWindow({
		title:'审批历史',
		height:550,
		width:800,
		url:url,
		onload:function(){
			
		}
	});

}

/**
 * 打开流程图。
 * {
 * 	taskId:"",
 * 	instId:"",
 * 	actInstId:"",
 * }
 * @param obj
 * @returns
 */
function openFlowImgDialog(obj){
	var url=__rootPath+"/bpm/core/bpmInst/image.do";
	if(obj.taskId){
		url+="?taskId=" + obj.taskId;
	}
	else if(obj.instId){
		url+="?instId=" + obj.instId;
	}
	else if(obj.actInstId){
		url+="?actInstId=" + obj.actInstId;
	}
	else if(obj.actDefId){
		url+="?actDefId=" + obj.actDefId;
	}
	
	_OpenWindow({
		title:'流程图查看',
		height:550,
		width:800,
		url:url,
		onload:function(){
			var iframe = this.getIFrameEl().contentWindow;
			iframe.setPostData(obj.jsonData);
		}
	});

}

/**
 * 打开留言板
 * @param instId
 * @returns
 */
function openBpmMessageDialog(instId){
	_OpenWindow({
	title:'流程留言板',
		height:600,
		width:600,
		openType:'NewWin',
		url:__rootPath+'/bpm/core/bpmMessageBoard/addMessage.do?instId='+instId,
		ondestroy: function(action){
		}
	});
}


/**
 * {
 * 	boDefId:"",
 * 	single:true,
 * 	callBack:回调函数
 * }
 * @param conf
 * @returns
 */
function openFormulaDialog(conf){
	var url=__rootPath+'/bpm/form/bpmTableFormula/dialog.do';
	if(conf.single==undefined) conf.single=true;
	url+="?single=" + conf.single;
	if(conf.boDefId){
		url+="&boDefId=" + conf.boDefId;
	}
	_OpenWindow({
		title:'选择表间公式',
		height:600,
		width:800,
		url:url,
		ondestroy: function(action){
			if(action!="ok") return;
			var win=this.getIFrameEl().contentWindow;
			var data = win.GetData();
			data = mini.clone(data); 
			if(conf.callBack){
				conf.callBack(data)
			}
		}
	});
}

/**
 * 打开工作日历
 * @param conf
 * @returns
 */
function openCalSettingDialog(conf){
	var url=__rootPath+'/oa/calendar/calSetting/dialog.do';
	if(conf.single==undefined) conf.single=true;
	url+="?single=" + conf.single;
	_OpenWindow({
		title:'选择工作日历',
		height:600,
		width:800,
		url:url,
		ondestroy: function(action){
			if(action!="ok") return;
			var win=this.getIFrameEl().contentWindow;
			var data = win.GetData();
			data = mini.clone(data); 
			if(conf.callBack){
				conf.callBack(data)
			}
		}
	});
}

/**
 * 自定义栏目对话框
 * @param conf
 * @returns
 */
function openColumnDefDialog(conf){
	var url=__rootPath+'/oa/info/insColumnDef/dialog.do';
	if(conf.single==undefined) conf.single=true;
	url+="?single=" + conf.single;
	_OpenWindow({
		title:'选择自定义栏目',
		height:600,
		width:800,
		url:url,
		ondestroy: function(action){
			if(action!="ok") return;
			var win=this.getIFrameEl().contentWindow;
			var data = win.GetData();
			data = mini.clone(data); 
			if(conf.callBack){
				conf.callBack(data)
			}
		}
	});
}

/**
 * 自定义栏目对话框
 * @param conf
 * @returns
 */
function openSysBoListDialog(conf){
	var url=__rootPath+'/sys/core/sysBoList/listDialog.do';
	_OpenWindow({
		title:'选择自定义列表',
		height:600,
		width:800,
		url:url,
		ondestroy: function(action){
			if(action!="ok") return;
			var win=this.getIFrameEl().contentWindow;
			var data = win.getData();
			data = mini.clone(data); 
			if(conf.callback){
				conf.callback(data)
			}
		}
	});
}

/**
 * 选择部门对话框。
 * @param conf
 * {
 * 		showTenant:true //是否显示租户
 * 		tenantId:"",
 * 		
 * 		type:"打开组织对话框类型,可能的值为:all,specific,current,level",
 * 		groupId:"" ,
 *  	grouplevel:"级别",
 *  	groups:[{groupId:"",name:""}] 选中的组织,
 *  	single:true ，是否单选。
 * }
 * 当 type 为 specific 时 ，需要指定 groupId
 * 当 type 为 level 时 需要指定 grouplevel。
 * @returns
 */
function _DepDialog(conf){
	var single=conf.single;	
	if(single==undefined){
		single=true;
    }
	
	var callback=conf.callback;
	var groups=conf.groups;
	var showTenant=conf.showTenant;
	var tenantId=conf.tenantId;
	
	delete conf.single;
	delete conf.showTenant;
	delete conf.callback;
	delete conf.groups;
	delete conf.tenantId;
	
	
	var config=JSON.stringify(conf);
	var url=__rootPath+'/sys/org/osGroup/initDialog.do?single='+single+'&config=' + config 
	if(tenantId){
		url+="&tenantId=" + conf.tenantId;
	}
	if(showTenant){
		url+="&showTenant=" + showTenant;
	}
	url=encodeURI(url);
	var width=single?600:900;
	_OpenWindow({
		iconCls:'icon-group-dialog',
		url:url,
		height:480,
		width:width,
		title:"部门选择对话框",
		onload:function(){
			if(single) return;
			var iframe = this.getIFrameEl().contentWindow;
			if(groups){
				iframe.init(groups);
			}
		},
		ondestroy:function(action){
			if(action!='ok')return;
			var iframe = this.getIFrameEl();
            var groups = iframe.contentWindow.getGroups();
            data = mini.clone(groups);
            if(callback){
            	if(single && groups.length==1){
            		callback.call(this,groups[0]);
            	}else{
            		callback.call(this,groups);
            	}
            }
		}
	});
}


/**
 * 
 * @param conf
 * @returns
 */
function _GroupDialog(conf){
	
}

/**
 * 打开正则表达式对话框
 * @param callback
 * @returns
 */
function openRegDialog(type,callback){
	_OpenWindow({
		url:__rootPath+'/bpm/core/bpmRegLib/dialog.do?type='+type,
		title:'正则表达式',
		height:500,
		width:800,
		ondestroy:function(action){
			if(action!='ok') return;
			var win=this.getIFrameEl().contentWindow;
			var data=win.getData();
			if(callback){
				callback(data);
			}
		}
	});
}


