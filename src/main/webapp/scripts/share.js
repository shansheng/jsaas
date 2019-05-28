/**
 * 关闭窗口
 * @returns {unresolved}
 */
function CloseWindow(action,preFun,afterFun) {
	
	if(preFun){
		preFun.call(this);
	}
    if (window.CloseOwnerWindow){
    	return window.CloseOwnerWindow(action);
    } 
    else{
    	window.close();
    } 
    	
    if(afterFun){
		afterFun.call(this);
	}
    
    if( $('.top_tab_box .active i', parent.document).length ){
    	$('.top_tab_box .active i', parent.document ).trigger("click");
    }
}


/**
 * 上移表格的行
 */
function upRowGrid(gridId) {
	var grid=mini.get(gridId);
    var row = grid.getSelected();
    if (row) {
        var index = grid.indexOf(row);
        grid.moveRow(row, index - 1);
    }
}
/**
 * 下移表格的行
 */
function downRowGrid(gridId) {
	var grid=mini.get(gridId);
	var row = grid.getSelected();
    if (row) {
        var index = grid.indexOf(row);
        grid.moveRow(row, index + 2);
    }
}
/**
 * 添加行
 * @param gridId
 * @param row
 */
function addRowGrid(gridId,row){
	var grid=mini.get(gridId);
	if(!row){
		row={};
	}
	grid.addRow(row);
}
/**
 * 删除选择行
 * @param gridId
 */
function delRowGrid(gridId){
	var grid=mini.get(gridId);
	var selecteds=grid.getSelecteds();
	grid.removeRows(selecteds,true);
}

/**
 * 清空所有行
 * @param gridId
 */
function delAll(gridId){
	
	var grid=mini.get(gridId);
	grid.setData();
	
}



/**
 * 打开窗口
 * @param config
 *         url 为打开窗口的内部地址
 *         title:窗口标题
 *         height:高
 *         width:宽
 *         onload：加载事件
 *         ondestory:关闭的事件
 */
function _OpenWindow(config){
	if(!config.iconCls){
		config.iconCls='icon-window';
	}
	
	if(typeof(config.allowResize)=='undefined'){
		config.allowResize=true;
	}
	
	if(typeof(config.showMaxButton)=='undefined'){
		config.showMaxButton=true;
	}
	if(typeof(config.showModel)=='undefined'){
		config.showModel=true;
	}
	
	var win=mini.open({
		iconCls:config.iconCls,
        allowResize: config.allowResize, //允许尺寸调节
        allowDrag: true, //允许拖拽位置
        showCloseButton: true, //显示关闭按钮
        showMaxButton: config.showMaxButton, //显示最大化按钮
        showModal: config.showModel,
        url: config.url,
        title: config.title, 
        width:config.width, 
        height: config.height,
        onload: function() {
        	if(config.onload){
        		config.onload.call(this);
        	}
        },
        ondestroy:function(action){
        	if(config.ondestroy){
        		config.ondestroy.call(this,action);
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

	if(config.max){
		win.max();
		mini.layout();
		flag=true;
	}
}

/**
 * 通用对话框，与_OpenWindow一样，唯一特别是需要传入
 * conf:{
 * 	dialogKey:"",
 * 	onload:function(){
 * 		var win = this.getIFrameEl().contentWindow;
 * 		
 * 	},
 * 	ondestroy:function(){
 * 		var win = this.getIFrameEl().contentWindow;
 * 	}
 * }
 * @param config
 */
function _CommonDialog(conf){
	var config=setConf(conf);
	_OpenWindow({
		title:config.title,
		height:config.height,
		width:config.width,
		url:__rootPath+'/dev/cus/customData/'+config.dialogKey+'/dialog.do',
		onload:function(){
			if(config.onload){
				config.onload.call(this);
			}
		},
		ondestroy:function(action){
			if(action!='ok') return;
			if(config.ondestroy){
				config.ondestroy.call(this);
			}
		}
	});
}

function setConf(conf){
	var dialogKey=conf.dialogKey;
	var url=__rootPath+'/dev/cus/customData/config/'+dialogKey+'.do';
	var obj=$.ajax({
		  url: url,
		  async: false,
		  dataType:"json"
		});
	var json = obj.responseJSON; 
	if(!json){
		json=mini.decode(obj.responseText);
	}
	var config={width:json.width,height:json.height,title:json.name};
	$.extend(config,conf);
	return config;
}

/**
 * 功能说明:
 * 打开自定义对话框。
 * {dialogKey:"dataSourceDialog",ondestroy:function(data){
	    		   var row=data[0];
	    		   btnEdit.setText(row.NAME_);
	    		   btnEdit.setValue(row.ALIAS_);
	},params:"",signle:"true"}
	dialogKey:对话框key。
	ondestroy:返回参数。
	params:对话框参数 格式为:name1=value1&name2=value2
 * 	single : 是否单选 ("true","false")
 * @param conf
 * @returns
 */
function _CommonDialogExt(conf){
	var config=setConf(conf);
	
	var url=__rootPath+'/dev/cus/customData/'+config.dialogKey+'/dialog.do';
	if(conf.params){
		url+="?" + conf.params;
	}
	if(conf.single){
		if(url.indexOf("?")==-1){
			url+="?single=" +conf.single;
		}
		else{
			url+="&single=" +conf.single;
		}

	}

	_OpenWindow({
		title:config.title,
		height:config.height,
		width:config.width,
		url:url,
		onload:function(){
			if(config.onload){
				config.onload.call(this);
			}
		},
		ondestroy:function(action){
			if(action!='ok') return;
			var win=this.getIFrameEl().contentWindow;
			var data=win.getData();
			if(config.ondestroy){
				config.ondestroy(data);
			}
		}
	});
}


/**
 * 自定义对话框控件中的buttonedit控件调用
 * @param e
 */
function _OnMiniDialogShow(e){
	var button=e.sender;
	var dialogalias=button.dialogalias;
	var dialogname=button.dialogname;
	var valueField=button.valueField;
	var textField=button.textField;
	_CommonDialog({
		title:dialogname,
		height:450,
		width:800,
		dialogKey:dialogalias,
		ondestroy:function(action){
			var win=this.getIFrameEl().contentWindow;
			var data=win.getData();
			var rows=data.rows;
			if(rows!=null && rows.length>0){
				rows=rows[0];
				button.setText(rows[textField]);
				button.setValue(rows[valueField]);
			}
		}
	});
}
/**
 * 获得Grid中的选择中的所有主键ID
 * @param gridId
 * @returns {Array}
 */
function _GetGridIds(gridId){
	var grid=mini.get('#'+gridId);
	 var rows = grid.getSelecteds();
	 var ids = [];
	 if (rows.length > 0) {
	     for (var i = 0, l = rows.length; i < l; i++) {
	         var r = rows[i];
	         ids.push(r.pkId);
	     }
	 }
	 return ids;
}

/**
 * 提交JSON信息
 * @param config
 *         url：必需，handle the url
 *         method:'POST' or 'GET' ,default is 'GET'
 *         data: data of the json ,such as {'field1':1,'feld2':2}
 *         success:成功返回时调用的函数，格式如：function(result){alert(result);}    
 */
function _SubmitJson(config){
	if(!config) return;
	if(!config.url) return;
	if(!config.method)config.method='POST';
	if(!config.data) config.data={};
	
	if(!config.submitTips){
		config.submitTips='正在处理...';
	}

	var msgId=null;
	//显示提交数据的进度条
	if(typeof(config.showProcessTips)=='undefined'){
		config.showProcessTips=true;
	}
	
	if(config.showProcessTips){
		msgId=mini.loading(config.submitTips, "操作信息");
	}
	var showMsg=(config.showMsg==false)?false:true;
	
	
	var options={
	        url: config.url,
	        type: config.method,
	        data: config.data,
	        cache: false,
	        success: function(result,status, xhr) {
	        	var valid=xhr.getResponseHeader("valid");
	        	if(config.showProcessTips  && msgId!=null){
	        		mini.get(msgId).hide();
	        	}
	        	if(valid!='true'){
	        		mini.Cookie.set('enabled',false);
	        	}
	        	if(typeof result=="string"){
	        		//简易判断是否为json。
	        		if(result.startWith("{") && result.endWith("}")){
	        			result=mini.decode(result);
	        		}
	        	}
	        	
	        	if(!result) return;
	        	
	        	if(result.success){
	        		if(config.success){
	            		config.success.call(this,result);
	            	}
	        		if(showMsg){
		        		var msg=(result.message!=null)?result.message:'成功执行!';
		        		//显示操作信息
		        		top._ShowTips({
		            		msg:msg
		            	});
		        		//alert(msg);
	        		}
	        	}else{
	        		if(config.fail){
	        			config.fail.call(this,result);
	        		}else if(showMsg){//
		        		try{
		        			top._ShowErr({
		            		content:result.message,
		            		data:result.data
		            	});	
		        		}catch(e){
							mini.alert(result.message);
		        		}
	        		}
	        	}
	        },
	        error: function(jqXHR) {
	        	if(config.showProcessTips && msgId!=null){
	        		mini.get(msgId).hide();
	        	}
	        	
	        	if(jqXHR.responseText!='' && jqXHR.responseText!=null){
		        	top._ShowErr({
		        		content:jqXHR.responseText
		        	});
	        	}
	        }
	    };
	//使用json的方式进行提交。
	if(config["postJson"]){
		options.contentType="application/json;charset=utf-8";
		if(options.data){
			options.data=JSON.stringify(options.data);
		}
	}
	$.ajax(options);
}

/**
 * 保存表单。
 * @param form
 * @param url
 * @param callBack
 * @param beforeHandler
 */
function _SaveData(formId,url,callBack,beforeHandler) {
	var form = new mini.Form(formId);
	form.validate();
    if (!form.isValid()) {
        return;
    }
    var formData=$("#" + formId).serializeArray();
    if(beforeHandler){
    	beforeHandler(formData);
    }
    var config={
    	url: url,
    	method:'POST',
    	data:formData,
    	success:function(result){
    		callBack(result);
    	}
    }
     
    _SubmitJson(config);
 }

/**
 * 提交表单。
 * @param formId		表单ID
 * @param url			表单地址
 * @param callBack		保存成功后进行处理
 * @param beforeHandler	在保存之前进行处理
 */
function _SaveJson(formId,url,callBack,beforeHandler) {
	var form = new mini.Form(formId);
	form.validate();
    if (!form.isValid()) {
        return;
    }
    var formData=form.getData();
    if(beforeHandler){
    	beforeHandler(formData);
    }
    var config={
    	url: url,
    	method:'POST',
    	data:formData,
    	success:function(result){
    		callBack(result);
    	}
    }
    config.postJson=true;
    _SubmitJson(config);
 }

/**
 * 
 * @param data
 * @param url
 * @param callBack
 * @param beforeHandler
 */
function _SaveDataJson(formId,callBack,beforeHandler) {
	var form=$("#" + formId);
	var url=form.attr("action");
	
	var frm = new mini.Form(formId);
	frm.validate();
    if (!frm.isValid()) {
        return;
    }
    var formData=frm.getData();
	
    if(beforeHandler){
    	var rtn=beforeHandler(formData);
    	if(!rtn) return;
    }
    var config={
    	url: url,
    	method:'POST',
    	data:formData,
    	success:function(result){
    		callBack(result);
    	}
    }
    config.postJson=true;
    _SubmitJson(config);
 }

/**
 * 操作完成后，展示操作提示
 * @param config
 */
function _ShowTips(config){
	var x,y,width,height;
	if(config==null){
		config={};
	}
	//title=config.title?config.title:'操作提示';
	msg=(config.msg!='' && config.msg!=undefined)?config.msg:'成功操作！';
	x=config.x?config.x:'center';
	y=config.y?config.y:'top';
	width=config.width?config.width:450;
	height=config.height?config.height:100;

	var en=getCookie('enabled');
    if(en=='false'){
		config.msg=config.msg+'<br/>'+__status_tips;
    }
	mini.showTips({
		width:width,
		height:height,
        content:"<em class='MyCenter'>" +
        		"<div class='hint'><h1>提示</h1><i class='icon-tips-Close'></i></div>" +
        		"<div  class='MyHint'>"+config.msg+"</div>"+
        		"</em>",
        state: "success",
        x: x,
        y: y,
        timeout: 3000
    });
}

/**
 * 展示出错信息
 * @param config
 */
function _ShowErr(config){

	var x,y,width,height;

	x=config.x?config.x:'center';
	y=config.y?config.y:'top';
	width=config.width;
	height=config.height || 'auto';
	var data=config.data || "";
	mini.showTips({
		 width:width,
		 height:height,
         content:"<em class='MyCenter colorRed'>" +
         			"<div class='hint'><h1>提示</h1><i class='icon-tips-Close'></i></div>"+
         			"<div  class='MyContent'>" +
         				"<div><span class='MyYuan'>!</span></div>" +
         				"<h4><span>错误信息:</span>"+config.content+"</h4>" +
         				"<textarea class='ConentS'>"+data+"</textarea>" +
         				"<div class='MyLook' onclick='lookDet(this)'>查看详情</div>" +
         			"</div>" +
         		 "</em>",
         state: "warning",
         x: x,
         y: y,
         timeout: 600000000
     });
}

function _close(This){
	$(This).parent().parent().slideUp(300);
}

function lookDet(obj){
	var o=$(obj);
	var p=o.closest(".MyContent");
	$(".ConentS ",p).toggle();  
}

/**
 * 获得业务表单的JSON值
 * @param String
 */
function _GetFormJson(formId){
	var modelJson={};
	var formData=$("#"+formId).serializeArray();
	for(var i=0;i<formData.length;i++){
		modelJson[formData[i].name]=formData[i].value;
	}
	
	var extJson=_GetExtJsons(formId);
	
	$.extend(modelJson,extJson);
	
	
	return modelJson;
}

/**
 * 获取表单数据。
 * @param formId
 * @returns
 */
function _GetFormJsonMini(formId){
	var form = new mini.Form("#"+ formId);
	var formContainer=$("#" + formId);
	var aryForm=$("[relationtype]",formContainer);
	var modelJson = {};
	//原来的数据结构
	if(aryForm.length==0){
		var frm=$("#"+formId);
		modelJson=form.getData();
		_GetExtJsonsMini(frm,modelJson);
	}
	//新的数据结构。
	else{
		aryForm.each(function(){
			var frm=$(this);
			var id=frm.attr("id");
			var relationtype=frm.attr("relationtype");
			if(relationtype=="main"){
				var mainForm=new mini.Form("#"+ id);
				var mainData = mainForm.getData();
				$(".mini-contextonly").each(function(){
					var obj = $(this);
					mainData[obj.attr("name")]=obj.text();
				});
				$.extend(modelJson, mainData);
				_GetExtJsonsComplex(frm,modelJson);
			}
		});
		aryForm.each(function(){
			var frm=$(this);
			var id=frm.attr("id");
			var tablename=frm.attr("tablename");
			var relationtype=frm.attr("relationtype");
			if(relationtype=="main") return true;

			var subForm=new mini.Form("#"+ id);
			var subJqForm=$("#"+ id);
			var subData=subForm.getData();
			_GetExtJsonsComplex(subJqForm,subData);
			modelJson["SUB_" +tablename]=subData;
			
		});
	}
	/**
	 * 获取字表的数据。
	 */
	$('.mini-datagrid,.mini-treegrid',formContainer).each(function(){
		var name=this.id;
		var grid=mini.get(name);
		name=name.replace("grid_","");
		modelJson["SUB_" +name]=grid.getData();
	});
	
	//处理意见。
	handOpinion(modelJson);
	
	if(modelJson.ID_=="null") modelJson.ID_="";
	return modelJson;
}

/**
 * 处理表单意见数据。
 * @param modelJson
 * @returns
 */
function handOpinion(modelJson){
	var pre="FORM_OPINION_";
	var i=0;
	for(var key in modelJson){
		if(!key.startWith(pre)) continue;
		var name=key.replace(pre,"");
		if(i==0){
			modelJson[pre]={name:name,val:modelJson[key]};
		}
		delete modelJson[key];
		i++;
	}
}


function _GetExtJsonsComplex(form,modelJson){
	 var ctls= mini.getChildControls(form[0]);
	 for(var i=0;i<ctls.length;i++){
		 var obj=ctls[i];
		 var type=obj.type;
		 if(type!="checkboxlist" && type!="radiobuttonlist" && type!="textboxlist") continue;
		 
		 var refField=obj.refField;
		 var value="";
		 var cname="";
		 var tmp=$(obj.el);
		 if(obj.type=="checkboxlist"){
			 	cname=tmp.find('tbody>tr>td').children('input[type="hidden"]').attr('name');
				var ctext=[];
				var list=tmp.find('tbody>tr>td>div').find('.mini-checkboxlist-item-selected');
				list.each(function(){
					ctext.add($(this).find("label").text());
				});
				value=ctext.join(",");
		 }
		 else if(obj.type=="radiobuttonlist"){
		 	cname=tmp.find('tbody>tr>td').children('input[type="hidden"]').attr('name');
		 	value=tmp.find('tbody>tr>td').find('.mini-radiobuttonlist-item-selected').find("label").text();
		 }
		 else if(obj.type=="textboxlist"){
			cname=tmp.find('tbody>tr>td').children('input[type="hidden"]').attr('name');
			var ctext=[];
			var list=tmp.find('tbody>tr>td>ul').children('.mini-textboxlist-item');
			list.each(function(){
				ctext.add($(this).text());
			});
			value=ctext.join(",");
		 }
		 if(refField){
			modelJson[refField]=value;
		 }
		 else{
			modelJson[cname+'_name']=value;
		 }
	 }
	
	
	form.find('.mini-radiobuttonlist').each(function(){
		var cname=$(this).find('tbody>tr>td').children('input[type="hidden"]').attr('name');
		var ctext=$(this).find('tbody>tr>td').find('.mini-radiobuttonlist-item-selected').find("label").text();
		modelJson[cname+'_name']=ctext;
	});
	
	form.find('.mini-checkboxlist').each(function(){
		var cname=$(this).find('tbody>tr>td').children('input[type="hidden"]').attr('name');
		var ctext=[];
		var list=$(this).find('tbody>tr>td>div').find('.mini-checkboxlist-item-selected');
		list.each(function(){
			ctext.add($(this).find("label").text());
		});
		modelJson[cname+'_name']=ctext.join(',');
	});
	
	form.find('.mini-textboxlist').each(function(){
		var cname=$(this).find('tbody>tr>td').children('input[type="hidden"]').attr('name');
		var ctext=[];
		var list=$(this).find('tbody>tr>td>ul').children('.mini-textboxlist-item');
		list.each(function(){
			ctext.add($(this).text());
		});
		modelJson[cname+'_name']=ctext.join(',');
	});
	
	
	return modelJson;
}

function _GetExtJsonsMini(form,modelJson){
	
	_GetExtJsonsComplex(form,modelJson);
	
	$('.mini-datagrid,.mini-treegrid',form).each(function(){
		var name=this.id;
		var grid=mini.get(name);
		name=name.replace("grid_","");
		modelJson["SUB_" +name]=grid.getData();
	});

	return modelJson;
	
}


function _GetExtJsons(formId){
	var form=$("#"+formId);
	var modelJson={};
	
	modelJson=_GetExtJsonsMini(form,modelJson);
	
	return modelJson;
}

/**
 * 获得表单的所有控件值串，格式为[{name:'a',value:'a'},{name:'b',value:'b'}],并且对value值的特殊符号包括中文进行编码
 * @param formId 表单ID
 * @returns
 */
function _GetFormParams(formId){
	return $("#"+formId).serializeArray();
}

/**
 * 加载用户信息，使用的时候，是需要在页面中带有以下标签，
 * <a class="mini-user" userId="11111"></a>
 * 其则会根据userId来加载处理成fullname
 * @param editable 是否可编辑
 */
function _LoadUserInfo(editable){
	var uIds=[];
	$('.mini-user').each(function(){
		var uId=$(this).attr('userId');
		if(uId){
			uIds.push(uId);
		}
	});
	if(uIds.length>0){
		$.ajax({
            url:__rootPath+ '/pub/org/user/getUserJsons.do',
            data:{
            	userIds:uIds.join(',')
            },
			type:"POST",
            success: function (jsons) {
                for(var i=0;i<jsons.length;i++){
                	if(editable){
                		$("a.mini-user[userId='"+jsons[i].userId+"']").attr('href','javascript:void(0)').attr('onclick','_ShowUserEditor(\''+jsons[i].userId+'\')').html(jsons[i].fullname);
                	}else{
                		$("a.mini-user[userId='"+jsons[i].userId+"']").html(jsons[i].fullname);
                	}
                	
                }
            }
        });
	}
}

/**
 * 加载用户信息，使用的时候，是需要在页面中带有以下标签，
 * <span class="mini-taskInfo" actInstId="11111"></span>
 * 其则会根据actInstId来加载处理成任务名称及执行
 */
function _LoadTaskInfo(){
	var uIds=[];
	$('.mini-taskinfo').each(function(){
		var uId=$(this).attr('instId');
		if(uId){
			uIds.push(uId);
		}
	});
	if(uIds.length>0){
		$.ajax({
            url:__rootPath+ '/pub/bpm/getTaskInfos.do',
            data:{
            	instIds:uIds.join(',')
            },
			type:"POST",
            success: function (jsons) {
                for(var i=0;i<jsons.length;i++){
                	var taskInfos="";
                	var taskUserInfos=jsons[i].taskUserInfos;
                	for(var c=0;c<taskUserInfos.length;c++){
                		
                		if(taskUserInfos[c].curUserTask){
                			taskInfos=taskInfos + " <a href='javascript:void(0);' alt='"+taskUserInfos[c].exeFullnames+"' onclick='_handleTask(\""+taskUserInfos[c].taskId+"\")' ";
                			taskInfos = taskInfos + " taskId='"+taskUserInfos[c].taskId+"'>"+taskUserInfos[c].nodeName+"</a>";
                		}else{
                			taskInfos = taskInfos +' ' + taskUserInfos[c].nodeName;
                		}
                		
                	}
                	$("span.mini-taskinfo[instId='"+jsons[i].instId+"']").html(taskInfos);
                }
            }
        });
	}
}

function _handleTask(taskId){
	_OpenWindow({
		url:__rootPath+'/bpm/core/bpmTask/toStart.do?taskId='+taskId,
		title:'待办处理',
		width:800,
		height:400,
		max:true,
		ondestroy:function(action){
			if(action!='ok') return;
		}
	});
}


/**
 * 加载用户组信息，使用的时候，是需要在页面中带有以下标签，
 * <a class="mini-group" groupId="11111"></a>
 * 其则会根据groupId来加载处理成name
 */
function _LoadGroupInfo(){
	var uIds=[];
	$('.mini-group').each(function(){
		var uId=$(this).attr('groupId');
		if(uId){
			uIds.push(uId);
		}
	});
	if(uIds.length>0){
		$.ajax({
            url:__rootPath+ '/pub/org/group/getGroupJsons.do',
            data:{
            	groupIds:uIds.join(',')
            },
            success: function (jsons) {
                for(var i=0;i<jsons.length;i++){
                	$("a.mini-group[groupId='"+jsons[i].groupId+"']").html(jsons[i].name);
                }
            }
        });
	}
}

/**
 * 获得表格的行的主键Id列表，并且用',’分割
 * @param rows
 * @returns
 */
function _GetIds(rows){
	var ids=[];
	for(var i=0;i<rows.length;i++){
		ids.push(rows[i].pkId);
	}
	return ids.join(',');
}


String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
 
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
};

String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
};

String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
};

/**
 * 将字符串解析为日期。 
 */
String.prototype.parseDate=function(){
	//yyyy-MM-dd
	var year=1970;
	//yyyy-MM-dd
	var aryDateTime=this.split(" ");
	
	var date=aryDateTime[0];
	var aryTmp=date.split("-");
	var year=parseInt(aryTmp[0]);
	var mon=parseInt(aryTmp[1])-1;
	var day=parseInt(aryTmp[2]);
	var hour=0;
	var minute=0;
	if(aryDateTime.length==2){
		var time=aryDateTime[1];
		var aryTmp=time.split(":");
		hour=parseInt(aryTmp[0]);
		minute=parseInt(aryTmp[1]);
	}
	return new Date(year,mon,day,hour,minute);
}

/**
 * 日期格式化方法。
 * 用法 : new Date().format("yyyy-MM-dd hh:mm:ss");
 * @param format
 * @returns
 */
Date.prototype.format = function(format){ 
	var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
	} 
	
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
}

/**
 * 获取当前最小时间。
 */
Date.prototype.Min = function(){ 
	this.setHours(0);
	this.setMinutes(0);
	this.setSeconds(0);
	return this;
}

/**
 * 获取最大时间。
 */
Date.prototype.Max = function(){ 
	this.setHours(23);
	this.setMinutes(59);
	this.setSeconds(59);
	return this;
}

/**
 * 在日期上减去具体的时间。
 * unit:时间单位 可能的值为 day,hour,minute
 * amount:数量。
 */
Date.prototype.sub = function(amount,unit){
	this.calc(unit,amount,false);
	return this;
}

/**
 * 在日期上增加时间。
 * unit:时间单位 可能的值为 day,hour,minute
 * amount:数量。
 */
Date.prototype.add = function(amount,unit){
	this.calc(unit,amount,true);
	return this;
}

/**
 * 在日期上增加具体的时间。
 */
Date.prototype.calc = function(unit,amount,add){
	var time=0;
	switch(unit){
		case 1:
			time=60*1000*amount;
			break;
		case 2:
			time=60*60*1000*amount;
			break;
		default :
			time=24*60*60*1000*amount;
	}
	if(add){
		this.setTime(this.getTime()+time);
	}
	else{
		this.setTime(this.getTime()-time);
	}
	return this;
}

/**
 * 两个日期相减。
 * @param date 			被减的日期类型数据
 * @param format		返回数据类型(1,分钟,2,小时,乱填或者默认则认为是天数)
 * @returns {Number}
 */
Date.prototype.subtract = function(date,format){
	  var minute= (this.getTime() - date.getTime())/(60 * 1000);
	  var day=parseInt(minute / (24*60));
	  var hour=parseInt(minute / 60);
	  var rtn=0;
	  switch(format){
	    //分钟
	  	case 1:
	  		rtn=minute  ;
	  		break;
	  	//小时
	  	case 2:
	  		rtn=hour ;
	  		break;
	  	//天数
	  	default :
	  		rtn=day +1;
	  }
	  return rtn;
}

/**
 * 两个日期相加。
 * @param date 			被加的日期类型数据
 * @param format		返回数据类型(1,分钟,2,小时,乱填或者默认则认为是天数)
 * @returns {Number}
 */
Date.prototype.addDate = function(date,format){
	  var minute= (this.getTime() + date.getTime())/(60 * 1000);
	  var day=parseInt(minute / (24*60));
	  var hour=parseInt(minute / 60);
	  var rtn=0;
	  switch(format){
	    //分钟
	  	case 1:
	  		rtn=minute  ;
	  		break;
	  	//小时
	  	case 2:
	  		rtn=hour ;
	  		break;
	  	//天数
	  	default :
	  		rtn=day +1;
	  }
	  return rtn;
}

/**
 * 日期大小比较。
 * @param date
 * @returns {Number}
 */
Date.prototype.compareTo = function(date){
	var time=this.getTime() - date.getTime();
	if(time>0) {
		return 1;
	}
	else if(time==0) {
		return 0;
	}
	return -1;
	
}

/**
 * 是否为短时期.
 */
Date.prototype.isShortDate=function(){
	if(this.getHours()==0 || this.getMinutes()==0 || this.getSeconds()==0) return true;
	return false;
}




/**
 * 时间计算。
 * @param date
 * @param format 1,返回分钟,2,返回天小时分钟格式。
 * @returns {String}
 */
Date.prototype.diff = function(date,format){
	  format =format ||2;
	  var minute= (this.getTime() - date.getTime())/(60 * 1000);
	  var day=parseInt(minute / (24*60));
	  var rest=minute -day *(24*60);
	  var hour=parseInt(rest / 60);
	  rest=parseInt( rest -hour* 60);
	  if(format==1){
		  return minute;
	  }
	  
	  if(day==0){
		  if(hour==0){
			  return rest +"分钟";
		  }
		  else{
			  return hour +"小时"+ rest +"分钟";
		  }
	  }
	  else{
		  return day +"天" + hour +"小时" + rest +"分钟";
	  }
}


AryUtil={};

/**
 * 是否在数组中存在。
 */
AryUtil.isExist=function(data,val){
	for(var i=0;i<data.length;i++){
		var tmp=data[i];
		if(tmp==val){
			return true;
		}
	}
	return false;
}
/**
 * 判断数组中键值为指定的值是否存在。
 */
AryUtil.isKeyExist=function(ary,key,val){
	for(var i=0;i<ary.length;i++){
		var obj=ary[i];
		if(obj[key]==val){
			return true;
		}
	}
	return false;
}


/**
 * 打开关联连接
 */
function _ShowLinkFieldInfo(url,linkType){
	if(linkType=='newWindow'){
		window.open(url);
	}else{
		_OpenWindow({
			title:'关联信息',
			url:url,
			height:500,
			width:800,
			max:true
		});
	}
}
	
/**
 * 自动定义按钮，点击弹出自定义对话框
 * 
 * @param e
 */
function _OnSelDialogShow(e){
	var button=e.sender;
	var binding=button.binding;
	var dialogalias=binding.dialogalias;
	var callback=button.callback;
	var params=getInput(binding);
	var seltype=binding.seltype;
	
	var conf={
			dialogKey:dialogalias,
			params:params,
			ondestroy:function(data){
				setRtnData(data,binding)
				if(callback){
					callback.call(this,data);
				}
			}
	};
	if(seltype){
		if(seltype=="single"){
			conf.single="true";
		}
		else if(seltype=="multi"){
			conf.single="false";
		}
	}
	
	
	_CommonDialogExt(conf);
}

/**
 * 自动编辑按钮，点击弹出自定义对话框
 * 
 * @param e
 */
function _OnEditSelDialogShow(e){
	var button=e.sender,
		binding=button.binding,
		dialogalias=binding.dialogalias,
		dialogname=binding.dialogname,
		returnFields=binding.returnFields,
		isMain = binding.isMain,
		callback=binding.callback,
		
		textField=binding.textField,
		valueField=binding.valueField,
		seltype=binding.seltype,
	
		subGrid,
		params="",
		row;
	if(!isMain){
		var gridName = binding.gridName;
		subGrid = mini.get("grid_"+gridName);
		if(subGrid!=null){
			subGrid.cancelEdit();
		}
		row=subGrid.getSelected();
	}
	
	params=getBtnEditInput(binding,row);
	
	var conf={
			dialogKey:dialogalias,
			params:params,
			ondestroy:function(data){
				var rows=data.rows;
				var single=data.single;
				if(rows==null || rows.length==0) return;
			
				if(isMain){//是否是主表
					bindFields_(returnFields,data);
					if(textField){
						var id=button.getValue();
						var name=button.getText();
						var obj=getPair(data,textField,valueField,id,name);
						button.setText(obj.name);
						button.setValue(obj.id);
						button.doValueChanged();
					}

				}else{//在子表
					var rowData = {};
					var rowObj=rows[0];
					for(var i=0;i<returnFields.length;i++){
						var filed=returnFields[i];
						if(!filed.bindField) continue;
						rowData[filed.bindField] = rowObj[filed.field];
					}				
					
					if(textField){
						var id=button.getValue();
						var name=button.getText();
						var obj=getPair(data,textField,valueField,id,name);
						button.setText(obj.name);
						button.setValue(obj.id);
						
						var name=button.name;
						rowData[name]=obj.id;
						rowData[name +"_name"]=obj.name;
						button.doValueChanged();
					}
					subGrid.updateRow(row,rowData);
					
				}
				//设置回调。
				if(callback){
					eval(callback +"(data)");
				}
			}
	};
	
	if(seltype){
		if(seltype=="single"){
			conf.single="true";
		}
		else if(seltype=="multi"){
			conf.single="false";
		}
	}
	
	_CommonDialogExt(conf);
}

/**
 * 绑定字段。
 * @param returnFields
 * @param data
 * @returns
 */
function bindFields_(returnFields,data){
	var rows=data.rows;
	//获取表单对象。
	var form=getFormByFields(returnFields);
	if(!form) return;
	var formData=form.getData();
	var obj={};
	for(var i=0;i<returnFields.length;i++){
		var field=returnFields[i];
		if(!field.bindField) continue;		
		var aryData=[];
		for(var j=0;j<rows.length;j++){
			var row=rows[j];
			aryData.push(row[field.field]);
		}
		var tmp=aryData.join(",");
		obj[field.bindField]=tmp;
	}
	form.setData($.extend(formData, obj));
	//触发变更事件
	for(var i=0;i<returnFields.length;i++){
		var field=returnFields[i];
		if(!field.bindField) continue;		
		if(field.bindField.endWith("_name"))continue;
		var ctl=mini.getByName(field.bindField);
		if(ctl&&ctl.doValueChanged){
			ctl.doValueChanged();
		}
	}
}


/**
 * 获取主表数据。
 * @param returnFields
 * @returns
 */
function getFormByFields(returnFields){
	var ctl=null;
	for(var i=0;i<returnFields.length;i++){
		var field=returnFields[i];
		if(!field.bindField) continue;			
		if(field.bindField.endWith("_name"))continue;
		var ctl=mini.getByName(field.bindField);
		if(ctl) break;
	}
	if(!ctl) return null;
	var formId=$(ctl.el).closest(".form-model").attr("id");
	var form = new mini.Form("#"+formId );
	return form;
}

function getNameField(returnFields,fieldName){
	for(var i=0;i<returnFields.length;i++){
		var field=returnFields[i];
		if(!field.bindField) continue;
		var name=fieldName +"_name";
		if(name==field.bindField){
			return field;
		}
	}
	return null;
}


function setRtnData(data,binding){
	var rows=data.rows;
	if(!rows || rows.length==0) return;
	
	var fields=binding.returnFields;
	var gridName=binding.gridName;
	
	//填充主表	
	if(gridName=="main"){
		bindFields_(fields,data)
	}
	//填充子表。
	else{
		var uniquefield=binding.uniquefield;
		var grid=mini.get("grid_" + gridName);
		var obj={};
		for(var i=0;i<fields.length;i++){
			var o=fields[i];
			if(!o.bindField){continue;}
			obj[o.field]=o.bindField;
		}
		var gridData=grid.getData();
		var newAry=[];
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			var newRow={};
			for(var key  in obj){
				//newKey 绑定字段
				var newKey=obj[key];
				newRow[newKey]=row[key];
			}
			
			if(uniquefield){
				var isExist=false;
				var val=newRow[uniquefield];
				for(var j=0;j<gridData.length;j++){
					var tmp=gridData[j];
					if(tmp[uniquefield]==val){
						isExist=true;
						break;
					}
				}
				if(!isExist){
					newAry.push(newRow);
				}
			}
			else{
				newAry.push(newRow);
			}
		}
		for(var i=0;i<newAry.length;i++){
			gridData.push(newAry[i]);
		}
		grid.setData(gridData);
	}
	
	
}

/**
 * 
 * @param data		{rows:rows,single:true}
 * @param textField
 * @param valueField
 * @param selectId
 * @param slectName
 * @returns
 */
function getPair(data,textField,valueField,selectId,slectName){
	var rows=data.rows;
	var single=data.single;
	if(single){
		var row=rows[0];
		return {id:row[valueField],
			name:row[textField]};
	}
	else{
		var aryId=[];
		var aryName=[];
		if(selectId){
			aryId=selectId.split(",");
			aryName=slectName.split(",");
		}
		
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			var id=row[valueField];
			if(isExist(aryId,id)) continue;
			aryId.push(row[valueField]);
			aryName.push(row[textField]);
		}
		return {id:aryId.join(","),
				name:aryName.join(",")};
	}
	
	
	
}

function isExist(ary,id){
	for(var i=0;i<ary.length;i++){
		if(ary[i]==id){
			return true;
		}
	}
	return false;
}









/**
 * 将字符串转换为日期。
 * 日期格式可以为:
 * 2009-09-11
 * 2009-09-11 09:30
 * 2009-09-11 09:30:33
 * @param str
 */
function parseDate(str){
	var myregexp = /(\d{4})-(\d{1,2})-(\d{1,2})\s?((\d{1,2}):(\d{1,2})(:(\d{1,2})){0,1}){0,1}/;
	var match = myregexp.exec(str);
	if(!match) return null;
	str = str.replace(/-/g,"/");
	var date = new Date(str);
	return date;
}


String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substr(0,str.length)==str)
	  return true;
	else
	  return false;
	return true;
};

//是否存在指定函数 
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//是否存在指定变量 
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            return false;
        } else {
            return true;
        }
    } catch(e) {}
    return false;
}



//表单数据转成json对象
$.fn.funForm2Object= function() {

	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {

			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			//alert( this.value);
			o[this.name] = this.value || '';
		}
	});
	return o;
};

function formToObject(formData){
	var o = {};
	
	$.each(formData, function() {
		if (o[this.name] !== undefined) {

			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

//表单数据转成json数据
$.fn.funForm2son = function() {
	return JSON.stringify(this.funForm2Object());
};

//var arr = [ { 'key' : 'NORMAL','value' : '启用','css' : 'green'}];
jQuery.extend({
	formatItemValue: function(arr,val) { 
		for(var i=0;i<arr.length;i++){
			var obj=arr[i];
			if(obj.key==val){
				return "<span class='"+obj.css+"'>"+obj.value+"</span>";
			}
		}
		return val;
	},
	/**
	 * 判断对象是否为数组。
	 */
	isArray:function(obj){
		return Object.prototype.toString.call(obj) === '[object Array]'; 
	},
	/**
	 * 克隆对象。
	 */
	clone: function(obj) { 
		var tmp={};
		if($.isArray(obj)){
			tmp=[];
		}
		var temp= $.extend(true,tmp,obj);
		return temp;
	},
	/**
	 * 获取选中的值。
	 */
	getChkValue:function(name){
		var exp="[name='"+name+"']";
		var aryRtn=[];
		$(exp).each(function(i){
			var obj=$(this);
			if( obj.is(":checked")){
				aryRtn.push(obj.val());
			}
		})
		return aryRtn.join(",");
	},
	/**
	 * 读取文件。
	 */
	getFile:function(path){
		var html = $.ajax({
			  type: "GET",
			  url: path,
			  cache:true,
			  async: false
		}).responseText; 
		return html;
	},
	/**
	 * 在textarea 中插入文本。
	 */
	insertText : function(txtarea, content) {
		// IE
		if (document.selection) {
			var theSelection = document.selection.createRange().text;
			if (!theSelection) {
				theSelection = content;
			}
			txtarea.focus();
			if (theSelection.charAt(theSelection.length - 1) == " ") {
				theSelection = theSelection.substring(0,
						theSelection.length - 1);
				document.selection.createRange().text = theSelection
						+ " ";
			} else {
				document.selection.createRange().text = theSelection;
			}
			// Mozilla
		} else if (txtarea.selectionStart || txtarea.selectionStart == '0') {
			var startPos = txtarea.selectionStart;
			var endPos = txtarea.selectionEnd;
			var myText = (txtarea.value).substring(startPos, endPos);
			if (!myText) {
				myText = content;
			}
			if (myText.charAt(myText.length - 1) == " ") { 
				subst = myText.substring(0, (myText.length - 1)) + " ";
			} else {
				subst = myText;
			}
			txtarea.value = txtarea.value.substring(0, startPos)+ subst+ txtarea.value.substring(endPos,txtarea.value.length);
			txtarea.focus();
			var cPos = startPos + (myText.length);
			txtarea.selectionStart = cPos;
			txtarea.selectionEnd = cPos;
			// All others
		} else {
			txtarea.value += content;
			txtarea.focus();
		}
		if (txtarea.createTextRange)
			txtarea.caretPos = document.selection.createRange().duplicate();
	}
});

/**
 * 转换json数据中的日期类型.
 * @param formData
 */
function _ConvertFormData(formData){
	for(var key in formData){
		var val=formData[key];
		if(!val) continue;
		if(val instanceof Date){
			var tmp=val.isShortDate()?val.format("yyyy-MM-dd"):val.format("yyyy-MM-dd hh:mm:ss");
			formData[key]=tmp;
		}
	}
}




function _ClearButtonEdit(e){
	var sender=e.sender;
	sender.setValue("");
	sender.setText("");
	sender.doValueChanged();
}



function handClick(btn,callback){
	btn.enabled=false;
	callback();
	btn.enabled=true;
}

(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            // 鼠标经过的延时时间
            hoverDuring: 200,
            // 鼠标移出的延时时间
            outDuring: 200,
            // 鼠标经过执行的方法
            hoverEvent: function(e){
                // 设置为空函数，绑定的时候由使用者定义
                $.noop();
            },
            // 鼠标移出执行的方法
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return $(this).each(function(e){
            $(this).hover(function(e){
                // 清除定时器
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent(e),
                    sets.hoverDuring);
                }, function(){
                    clearTimeout(hoverTimer);
                    outTimer = setTimeout(sets.outEvent,
                        sets.outDuring);
                });    
            });
    }      
})(jQuery);


/**
 * 执行自定义SQL。
 * alias ： 自定义SQL别名
 * params ：自定义SQL的参数{参数名1:参数值1}
 * callBack : 执行自定义SQL的回调函数。
 * async ： 是否同步执行
 * 
 * 调用方法：
 * doQuery("user",params,function(data){
 * });
 * 
 * @param params
 * @param callBack
 */
function doQuery(alias, params,callBack,async){
	async=async || false;
	var url=__rootPath+"/sys/db/sysSqlCustomQuery/queryForJson_"+alias+".do";
	url=encodeURI(url);
	var config={
		url : url,
		type : "POST",
		async : async,
		success : function(result, status) {				
			if (result && callBack) {
				callBack(result);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			mini.alert("出错,错误码=" + XMLHttpRequest.status);
			mini.alert("出错=" + XMLHttpRequest.responseText);
		}
	}
	if(params){
		var type=typeof params;
		if(type=="object"){
			params=mini.encode(params);
		}
		var data={"params":params};
		config.data= data;
	}
	$.ajax(config);
}

/**
 * 执行服务端调用脚本。
 * @param alias		脚本别名
 * @param params	参数
 * @param callBack	回调函数
 * @param async		是否异步
 * @returns
 */
function doExcute(alias, params,callBack,async){
	async=async || false;
	var url=__rootPath+"/sys/core/sysInvokeScript/invoke/"+alias+".do";
	url=encodeURI(url);
	var config={
		url : url,
		type : "POST",
		async : async,
		success : function(result, status) {				
			if (result.success && callBack) {
				callBack(result.data);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			mini.alert("出错,错误码=" + XMLHttpRequest.status);
			mini.alert("出错=" + XMLHttpRequest.responseText);
		}
	}
	if(params){
		var type=typeof params;
		if(type=="object"){
			params=mini.encode(params);
		}
		var data={"params":params};
		config.data= data;
	}
	$.ajax(config);
}

/**
 * 获取浏览器版本。
 * @returns
 */
function getBrowser(){
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return { browser : "Edge", version : sys.edge };
    if (sys.ie) return { browser : "IE", version : sys.ie };
    if (sys.firefox) return { browser : "Firefox", version : sys.firefox };
    if (sys.chrome) return { browser : "Chrome", version : sys.chrome };
    if (sys.opera) return { browser : "Opera", version : sys.opera };
    if (sys.safari) return { broswer : "Safari", version : sys.safari };
    
    return { browser : "", version : "0" };
}
/**
 * 获取浏览器版本
 * 0 ：IE
 * 1 : Firefox，Chrome
 * -1: 不支持的浏览器
 */
function getBrowserType(){
	var o=getBrowser();
	if(o.browser=="IE" ){
		return 0;
	}
	else if(o.browser=="Firefox" || o.browser=="Chrome"){
		return 1;
	}
	return -1;
}


/**
 * 在表单中动态插入脚本。
 * @param aryScript	脚本。
 * @param id		容器ID可以不传
 * @returns
 */
function insertScript(aryScript,id){
	if(!aryScript) return;
	var container ;
	if(id){
		container = document.getElementById(id);	
	}
	else{
		container=document.body;
	}
	for(var i=0;i<aryScript.length;i++){
		var obj=aryScript[i];
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		if(obj.type=="src"){
			newScript.setAttribute("src",obj.content) ;
		}
		else{
			newScript.innerHTML = obj.content;
		}
		container.appendChild(newScript);
	}
}

/**
 * 解析html 将html和脚本进行分离。
 * 返回数据格式为:
 *	{html:"html内容",
 * 		script:[
 * 			{type:"src",content:"脚本地址"},
 * 			{type:"script",content:"脚本内容"}
 * 		]
 *	}
 * @param {Object} html
 */
function parseHtml(html){
	var regSrc=/<script\s*?src=('|")(.*?)\1\s*>(.|\n|\r)*?<\/script>/img;
	var match = regSrc.exec(html);
	var aryToReplace=[];
	var rtn=[];
	while (match != null) {
		aryToReplace.push(match[0]);
		var o={type:"src",content:match[2]};
		rtn.push(o);
		match = regSrc.exec(html);
	}
	//替换脚本
	for(var i=0;i<aryToReplace.length;i++){
		html=html.replace(aryToReplace[i],"");
	}
	aryToReplace=[];
	var regScript = /<script(?:\s+[^>]*)?>((.|\n|\r)*?)<\/script>/img;

	var match = regScript.exec(html);
	
	while (match != null) {
		aryToReplace.push(match[0]);
		var o={type:"script",content:match[1]};
		rtn.push(o);
		match = regScript.exec(html);
	}
	//替换脚本
	for(var i=0;i<aryToReplace.length;i++){
		html=html.replace(aryToReplace[i],"");
	}
	return {html:html,script:rtn};
}


/**
 * 弹出新窗口
 * @param url
 * @param name
 * @returns
 */
function openNewWindow(url,name){  
	var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1";    //定义弹出窗口的参数  
	if (window.screen) {  
	   var ah = screen.availHeight - 30;  
	   var aw = screen.availWidth ;  
	   fulls += ",height=" + ah;  
	   fulls += ",innerHeight=" + ah;  
	   fulls += ",width=" + aw;  
	   fulls += ",innerWidth=" + aw;  
	   fulls += ",resizable"  
	} else {  
	   fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually  
	}  
	var newWindow=window.open(url);
	return newWindow;
}  



/**
 * 打开列表中外部关联数据窗口
 */
function _ShowCusLink(title,linkType,url){
	if(linkType=='newWindow'){
		window.open(url);
	}else{
		_OpenWindow({
			title:title,
			height:500,
			width:800,
			url:url,
			max:true
		});
	}
}
//交互效果
$(document)
	.on('mouseover','.p_top',function(){
		var p_top = "",
			p_time = "";
		if($(this).attr('data-pos')){
			p_top = $(this).attr('data-pos');
		}else{
			p_top = 2;
		}
		
		if($(this).attr('data-time')){
			p_time = $(this).attr('data-time');
		}else{
			p_time = 200;
		}
		
		$(this).animate( {top: -p_top} , p_time );
	})
	.on('mouseleave','.p_top',function(){
		$(this).stop(true,false).animate( {top:0} , 200 );
	})
	.on('click','.theme',function(){
		var dataSrc = $(this).attr('data-src');
		$.cookie("index",dataSrc,{ expires: 365});
		window.location.href = __rootPath+"/index.do";
	})
	.on('mouseover','.top_icon li',function(){
		$(this).children('dl').stop(true,true).slideDown(300);
	})
	.on('mouseleave','.top_icon li',function(){
		$(this).children('dl').stop(true,true).slideUp(100);
	})
	.on('click' , '.mini-tips .icon-tips-Close' , function(){//提前关闭弹窗
		$(this).parents(".mini-tips").slideUp(400);
	})
	.on('click' , '.refreshWelcome' , function(){//刷新首页
		$('#welcome', parent.document ).attr('src',$('#welcome', parent.document ).attr('src'));
	})
	.ready(function (){
		if($('.mini-panel-body .mini-grid-rows-view').length){
			try{
				if(!grid)return;
				grid.on('load',function(e){
					if(e.data.length>14){//大于15条数据展开搜索框
						//$('.searchSelectionBtn').trigger("click").addClass('_open').prev('.search-form').show();
						
					}else if(e.data.length == 0 && !$('.listEmpty').length){
						$('#'+grid.id+' .mini-panel-body .mini-grid-rows-view').append("<div class='listEmpty'><img src='"+__rootPath+"/styles/images/index/empty.png'/><span>暂无数据</span></div>");
					}else if(e.data.length>0 && $('.listEmpty').length){
						$('.listEmpty').remove();
					}
				})
			}catch(e){
				return;
			}
		}
	}); 

/**
 * 根据编辑器获取表格和行。
 * @param editor
 * @returns
 */
function getGridByEditor(editor) {
    var grids = mini.findControls(function (control) {
    	var type=control.type;
        if (type == "datagrid" || type == "treegrid" ) return true;
    })
    for (var i = 0, l = grids.length; i < l; i++) {
        var grid = grids[i];
        var row = grid.getEditorOwnerRow(editor);
        if(row){
        	return {grid:grid,row:row};
        }
    }
    return null;
}


function addBody(){
	$('body').addClass('newBody');
};

function indentBody(){
	if(!$('.mini-window',parent.document).length){
		$('.mini-tabs-body:visible', parent.document).addClass('index_box');
		$('.show_iframe:visible', parent.document).addClass('index_box');
	}
}

/*
 * 
 * 展开收起
 *
 */
function no_search(This,ID){
	$(This).toggleClass("_open");
	$("#"+ID+"").slideToggle(300);
	setTimeout("mini.layout()",300);
	/*$(This).parents("body").find(".toolBtnBox").toggleClass("toolBtnBoxTop");*/
}
/*“更多”展开收起*/
 function no_more(This,ID){
 	var texts = $(This).find("em").text();
 	if (texts == "展开"){
		$(This).find("em").text("收起");
	}else{
		$(This).find("em").text("展开");
	}
	 $(This).find(".unfoldIcon").toggleClass("upIcon");
	 $("#"+ID+"").slideToggle(300);
	 setTimeout("mini.layout()",300);
 }
/*
 * 打印
 */
function Print(){
	$('body').addClass('bodyPrint')
	window.print()
	setTimeout(
		function(){
			$('body').removeClass('bodyPrint');
		}
	,100);
}

/**
*
* @param num
* @param precision
* @param separator
* @returns {*}
*=======================================================
*     formatNumber(10000)="10,000"
*     formatNumber(10000, 2)="10,000.00"
*     formatNumber(10000.123456, 2)="10,000.12"
*     formatNumber(10000.123456, 2, ' ')="10 000.12"
*     formatNumber(.123456, 2, ' ')="0.12"
*     formatNumber(56., 2, ' ')="56.00"
*     formatNumber(56., 0, ' ')="56"
*     formatNumber('56.')="56"
*     formatNumber('56.a')=NaN
*=======================================================
*/
function formatNumber(num, precision, separator) {
   var parts;
   // 判断是否为数字
   if (!isNaN(parseFloat(num)) && isFinite(num)) {
       // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
       // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
       // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
       // 的值变成了 12312312.123456713
       num = Number(num);
       // 处理小数点位数
       num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
       // 分离数字的小数部分和整数部分
       parts = num.split('.');
       // 整数部分加[separator]分隔, 借用一个著名的正则表达式
       parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

       return parts.join('.');
   }
   return NaN;
}


/**
* 把数字转换成货币的格式
* @param decimals
* @param dec_point
* @param thousands_sep
* @returns {string}
*/
Number.prototype.format=function(decimals, dec_point, thousands_sep){
   var num = (this + '')
       .replace(/[^0-9+\-Ee.]/g, '');
   var n = !isFinite(+num) ? 0 : +num,
       prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
       sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
       dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
       s = '',
       toFixedFix = function(n, prec) {
           var k = Math.pow(10, prec);
           return '' + (Math.round(n * k) / k)
                   .toFixed(prec);
       };
   // Fix for IE parseFloat(0.55).toFixed(0) = 0;
   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
       .split('.');
   if (s[0].length > 3) {
       s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
   }
   if ((s[1] || '')
           .length < prec) {
       s[1] = s[1] || '';
       s[1] += new Array(prec - s[1].length + 1)
           .join('0');
   }
   return s.join(dec);
}

function _OnGridEditDialogShow(e){
		var button=e.sender;
		var dialogalias=button.dialogalias;
		
		if(!dialogalias) return; 
		var conf={
				dialogKey:dialogalias,
				params:'',
				ondestroy:function(data){
					var rtn=data.rows;
					
					var grid = mini.get("datagrid1");
					var rowID=button.ownerRowID;
					var row=grid.getRowByUID(rowID);
					var copyRow=$.extend(true, {}, row);

					//设置绑定值
					var returnFields=button.returnFields;
					for(var i=0,j=returnFields.length;i<j;i++){
						var ob=returnFields[i];
						if(!ob.bindField) continue;
						var fieldVal=[];
						for(var m=0,n=rtn.length;m<n;m++){
							if(rtn[m][ob.field]){
								fieldVal.push(rtn[m][ob.field]);
							}
						}
						copyRow[ob.bindField]=fieldVal.join(",");
					}
					
					//显示值   valuefield
					var value=[];
					//var text=[];
					for(var m=0,n=rtn.length;m<n;m++){
						if(rtn[m][button.valuefield]){
							value.push(rtn[m][button.valuefield]);
						}
					}
					
					//设置编辑框 文本  值
					
					var val=value.join(",");
					
					button.setText(val);
					button.setValue(val);
					button.doValueChanged();
					
					copyRow[button.field]=val;
					//更新行
					grid.updateRow(row,copyRow);
				}
		};
		_CommonDialogExt(conf);
}

/**
 * 初始化帮助。
 * <div class="div-helper" >
 *		<div  class="iconfont icon-helper icon-Help-configure" title="帮助" helpid="formulaHelp" placement="w"></div>
 *	</div>
 * helpid：指向一个div 这个div 是具体的帮助内容。
 * placement:w:西，e:东，n:北,s :南
 * @returns
 */
function initHelp(){
	$(".helper").each(function(){
		var o=$(this);
		var helpid=o.attr("helpid");
		var placement=o.attr("placement") || "e";
		var html=$("#" + helpid).html();
		o.data('powertip',html);
		o.powerTip({
		     placement: placement,
		     mouseOnToPopup: true
		 });
	})
}

/**
 * 传入别名获取流水号的JS方法。
 * @param alias		流水号别名
 * @param callBack	回调方法
 * @param async		是否异步调用
 * @returns
 */
function getSeqNo(alias,callBack,async){
	var url=__rootPath +"/sys/core/sysSeqId/genNo_" + alias +".do";
	if(async==undefined) async=true;
	
	var config={
		url : url,
		type : "GET",
		async : async,
		success : function(result, status) {				
			if (result && callBack) {
				callBack(result);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			mini.alert("出错,错误码=" + XMLHttpRequest.status);
			mini.alert("出错=" + XMLHttpRequest.responseText);
		}
	}
	$.ajax(config);
}

/**
 * 调用自定义web请求。
 * @param key		    别名
 * @param paramsData	传入参数
 * @param callBack   	回调函数 
 */
function startWebReqDef(key,paramsData,callBack){
	var url=__rootPath +"/sys/webreq/sysWebReqDef/start.do";
	//if(async==undefined) async=true;
	var json={key:key,paramsData:paramsData};
	$.post(url,json,function(rtn){
		callBack(rtn);
	})
}

/**
 * 调用脚本。
 * @param alias		别名
 * @param params	传入参数
 * @param callBack	回调函数 
 * 参数结构
 * {
 * 	success:true,false
 * 	message:返回结果提示
 * 	data:调用服务端脚本返回数据
 * }
 * @returns
 */
function invokeScript(alias,params,callBack){
	var url=__rootPath +"/sys/core/sysInvokeScript/invoke/" + alias+".do";
	var json={params:params};
	$.post(url,json,function(rtn){
		callBack(rtn);
	})
}


/**
 * 在父元素中，查询指定类型的控件。
 * @param el
 * @param type
 * @returns
 */
function getControl(el,type){
	var ctls=mini.getChildControls(el);
	for(var i=0;i<ctls.length;i++){
		var ctl=ctls[i];
		if(ctl.type==type){
			return ctl;
		}
	}
	return null;
}

/**
 * mini-buttonedit-input控件中的清空图标的清空功能
 */
function _OnButtonEditClear(e){
	var btn=e.sender;
	btn.setText('');
	btn.setValue('');
}

/**
 * 删除表格数据。
 * @param data
 * @returns
 */
function _RemoveGridData(data){
	for(var i=0;i<data.length;i++){
  		var row=data[i];
  		delete row._id;
  		delete row._uid;
  		delete row._state;
  	}
}

 /**
  * 回填子表数据
  */
 function _SetSubData(data,formId){
	 var formContainer=$(formId);
	 var subTableList =[];
	 /**
	  * 获取子表对象。
	  */
	 $('.mini-datagrid,.mini-treegrid',formContainer).each(function(){
		 var grid=mini.get(this.id);
		 subTableList.push(grid);
	 });
	 if(subTableList.length>0){
		 for(var i=0;i<subTableList.length;i++){
			 var gridObj =subTableList[i];
			 var gridName =gridObj.name;
			 gridName="SUB_" +gridName.replace("grid_","");
			 for(var key in data){
				 if(gridName==key){
					 gridObj.setData(data[key]);
					 break;
				 }
			 }
		 }
	 }
 }
