/**
 * 数字转大写。
 * @param n
 * @returns
 */
function toChineseMoney(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
            n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

/**
 * 关闭窗口
 * @param e
 */
function onCancel(e){
	CloseWindow('cancel');
}

/**
 * 保存表单。
 * @param formId
 */
function onSave(formId){
	//若有自定义函数，则调用页面本身的自定义函数
	if(isExitsFunction('selfSaveData')){
		selfSaveData.call();
		return;
	}
	var form = new mini.Form("#"+formId); 
    form.validate();
    if (!form.isValid())  return;
    
    var formData=_GetFormJsonMini(formId);
    var url=__rootPath + $("#" + formId).attr("action");
  
   
   //若定义了handleFormData函数，需要先调用 
   if(isExitsFunction('handleFormData')){
    	var result=handleFormData(formData);
    	if(!result) return;
    }
    
    var config={
    	url:url,
    	method:'POST',
    	data:formData,
    	success:function(result){
    		//如果存在自定义的函数，则回调
    		if(isExitsFunction('successCallback')){
    			successCallback.call(this,result);
    			return;	
    		}
    		CloseWindow('ok');
    	}
    }
    
    config.postJson=true;
    
    _SubmitJson(config);
}

/**
 * 表格上移
 * @param id
 * @returns
 */
function moveUpRow(id) {
	var headGrid=mini.get(id);

    var row = headGrid.getSelected();
    if (row) {
        var index = headGrid.indexOf(row);
        headGrid.moveRow(row, index - 1);
    }
}

/**
 * 表格下移。
 * @param id
 * @returns
 */
function moveDownRow(id) {
	var headGrid=mini.get(id);
    var row = headGrid.getSelected();
    if (row) {
        var index = headGrid.indexOf(row);
        headGrid.moveRow(row, index + 2);
    }
}

/**
 * 表格中附件渲染
 * @param e
 * @returns
 */
function onFileRender(e){
    var record = e.record;
    var files =record[e.field];
    if(!files) return "";
    var s="";
    var aryFile=mini.decode(files);
  	for(var i=0;i<aryFile.length;i++){
  		var file=aryFile[i];
  		s+=getFile(file) ;
  	}
    return s;
}

/**
 * 表格中图片渲染
 * @param e
 * @returns
 */
function onImgRender(e){
    var record = e.record;
    var img =record[e.field];
    if(!img) return "";
    
    var imgJson=mini.decode(img);

    var url="";
    var val=imgJson.val;
    if(imgJson.imgtype=="upload"){
    	url=__rootPath+'/sys/core/file/previewFile.do?fileId='+ val;
    }
    else{
    	if(val.startWith("http")){
    		url=val;
    	}
    	else{
    		url=__rootPath +val;
    	}
    }
    var str="<img src='"+url+"' style='width:200px;height:auto'/>";
    return str;
}

function getFile(file){
	var fileName=file.fileName;
	var aryDoc=["docx","doc","xlsx","xls","pptx","ppt"];
	var aryImg=["jpg","png","bmp","gif"];
	var ary=[];
	
	var fileId=file.fileId;
	
	if(isExtend(aryDoc, fileName)) { 
		ary.push( '<a class="openImg" href="#" onclick="_openDoc(\''+fileId+'\');">'+fileName+'</a>');
	}
	else if(isExtend(aryImg, fileName)) { 
		ary.push('<a class="openImg"  href="#" onclick="_openImg(\''+fileId+'\');">'+fileName+'</a>');
	}
	else if(fileName.indexOf('pdf')!=-1) { 
		ary.push('<a class="openImg" href="#" onclick="_openPdf(\''+fileId+'\');">'+fileName+'</a>');
	}
	else{
		ary.push('<a class="openImg" target="_blank" href="'+__rootPath+'/sys/core/file/previewFile.do?fileId='+fileId+'">'+fileName+'</a>');
	}
	ary.push("<a target='_blank' href='"+__rootPath+"/sys/core/file/download/"+fileId+".do'><image style='margin-left:5px;cursor:pointer;border:0;'   src='"+__rootPath+"/styles/icons/download.png'  /></a>");
	return ary.join("");
}

function isExtend(aryExt,fileName){
	for(var i=0;i<aryExt.length;i++){
		var tmp=aryExt[i];
		if(fileName.indexOf(tmp)!=-1){
			return true;
		}
	}
	return false;
}

/**
 * 删除相关数据。
 * @param rows
 * @returns
 */
function removeData(rows){
	for(var i=0;i<rows.length;i++){
		var row=rows[i];
		delete row.tenantId;
		delete row.updateBy;
		delete row.updateTime;
		delete row.createTime;
		delete row.createBy;
		delete row.pkId;
	}
	return rows;
}