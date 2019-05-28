/*自定义vtype*/
mini.VTypes["isEnglishErrorText"] = "必须输入英文或下划线";
mini.VTypes["isEnglish"] = function (v) {
    if (/^[a-zA-Z\_]+$/g.test(v)) return true;
    return false;
}

mini.VTypes["isEnglishAndNumberErrorText"] = "必须输入英文或数字";
mini.VTypes["isEnglishAndNumber"] = function (v) {
    if (/^[0-9a-zA-Z\_]+$/g.test(v)) return true;
    return false;
}


mini.VTypes["isKeyLabelErrorText"] = "必须输入英文开头";
mini.VTypes["isKeyLabel"] = function (v) {
    if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(v)) return true;
    return false;
}

mini.VTypes["isNumberErrorText"] = "必须输入数字";
mini.VTypes["isNumber"] = function (v) {
    if (/^[-+]?[0-9]+(\.[0-9]+)?$/g.test(v)) return true;
    return false;
}

mini.VTypes["isIntegerErrorText"] = "必须输入整数";
mini.VTypes["isInteger"] = function (v) {
    var re = new RegExp("^[-+]?[0-9]+$");
    if (re.test(v)) return true;
    return false;
}

mini.VTypes["isPositiveIntegerErrorText"] = "必须输入正整数";
mini.VTypes["isPositiveInteger"] = function (v) {
    if (/^[1-9]\d*$/g.test(v)) return true;
    return false;
}

mini.VTypes["isNegtiveIntegerErrorText"] = "必须输入负整数";
mini.VTypes["isNegtiveInteger"] = function (v) {
    if (/^-[0-9]\d*$/g.test(v)) return true;
    return false;
}

mini.VTypes["isFloatErrorText"] = "必须输入浮点数";
mini.VTypes["isFloat"] = function (v) {
    if (/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/g.test(v)) return true;
    return false;
}

mini.VTypes["isPositiveFloatErrorText"] = "必须输入正浮点数";
mini.VTypes["isPositiveFloat"] = function (v) {
    if (/^([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/g.test(v)) return true;
    return false;
}

mini.VTypes["isNegtiveFloatErrorText"] = "必须输入负浮点数";
mini.VTypes["isNegtiveFloat"] = function (v) {
    if (/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/g.test(v)) return true;
    return false;
}

mini.VTypes["isChineseErrorText"] = "必须输入中文";
mini.VTypes["isChinese"] = function (v) {
    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    if (re.test(v)) return true;
    return false;
}

mini.VTypes["IDCardErrorText"] = "必须输入15-18位数字";
mini.VTypes["IDCard"] = function (v) {
    if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v)) return true;
    return false;
}

mini.VTypes["isUrlErrorText"] = "必须输入合法Url地址";
mini.VTypes["isUrl"] = function (v) {
	var reg=new RegExp("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (reg.test(v)) return true;
    return false;
}

mini.VTypes["isEmailErrorText"] = "必须输入合法Email地址";
mini.VTypes["isEmail"] = function (v) {
    if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/g.test(v)) return true;
    return false;
}

/**
 * 是否为中国邮政编码（6位数字）
 */
mini.VTypes["isChinesePostCodeErrorText"] = "必须输入合法中国邮编地址";
mini.VTypes["isChinesePostCode"] = function (v) {
    if (/^[1-9]\d{5}(?!\d)$/g.test(v)) return true;
    return false;
}

/**
 * 是否为中国固话
 * 匹配国内电话号码，匹配形式如 0511-4405222 或 021-87888822
 * @param v
 */
mini.VTypes["isChinesePhoneErrorText"] = "必须输入合法中国固话号码";
mini.VTypes["isChinesePhone"] = function (v) {
    if (/^\d{3}-\d{8}|\d{4}-\d{7}$/g.test(v)) return true;
    return false;
}

/**
 * 是否为中国手机号,其必须以下号码开头
 * 
 * 移动：134、135、136、137、138、139、150、151、157(TD)、158、159、187、188
 * 联通：130、131、132、152、155、156、185、186
 * 电信：133、153、180、189、（1349卫通）
 * 
 * @param v
 */
mini.VTypes["isChineseMobileErrorText"] = "必须输入合法中国手机号码";
mini.VTypes["isChineseMobile"] = function (v) {
	var re=new RegExp("^((13[0-9])|(17[0-9])|(15[^4,\\D])|(18[0,2,3,5-9]))\\d{8}$");
    if (re.test(v)) return true;
    return false;
}

/**
 * 是否为IP地址
 * @param v
 * @returns {Boolean}
 */
mini.VTypes["isIPErrorText"] = "必须输入合法IP地址";
mini.VTypes["isIP"] = function (v) {
    if (/^\d+\.\d+\.\d+\.\d+$/g.test(v)) return true;
    return false;
}

/**
 * 是否为QQ
 * @param v
 * @returns {Boolean}
 */
mini.VTypes["isQQErrorText"] = "必须输入正确QQ号码";
mini.VTypes["isQQ"] = function (v) {
    if (/^[1-9][0-9]{4,}$/g.test(v)) return true;
    return false;
}


mini.VTypes["lengthErrorText"] = "长度超过数据库设定范围";
mini.VTypes["length"] = function (v,args) {
	if(v.length<=args){
		return true;
	}
    return false;
}

mini.VTypes["lenErrorText"] = "超出整数位长度";
mini.VTypes["len"] = function (v,args) {
	if(v.length<=args){
		return true;
	}
    return false;
}

mini.VTypes["minLenErrorText"] = "小于最小长度";
mini.VTypes["minLen"] = function (v,args) {
	if(v.length>=parseInt(args)){
		return true;
	}
    return false;
}

mini.VTypes["minnumErrorText"] = "低于最小限定值";
mini.VTypes["minnum"] = function (v,args) {
	if(parseFloat(v)>=parseFloat(args)){
		return true;
	}
    return false;
}

mini.VTypes["maxnumErrorText"] = "超过最大限定值";
mini.VTypes["maxnum"] = function (v,args) {
	if(parseFloat(v)<=parseFloat(args)){
		return true;
	}
    return false;
}

mini.VTypes["decimalErrorText"] = "精度超过了范围";
mini.VTypes["decimal"] = function (v,args) {
	var vArray=v.split(".");
	if(vArray.length>=2){
		if(vArray[1].toString().length>parseFloat(args)){
			return false;
		}
	}
    return true;
}

function onEnglishValidation(e) {
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isEnglish(e.value) == false) {
			e.errorText = "必须输入英文";
			e.isValid = false;
		}
	}
}

function onEnglishAndNumberValidation(e) {
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isEnglishAndNumber(e.value) == false) {
			e.errorText = "必须输入英文+数字";
			e.isValid = false;
		}
	}
}

function onNumberValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isNumber(e.value) == false) {
			e.errorText = "必须输入正负的数字";
			e.isValid = false;
		}
	}
}

function onChineseValidation(e) {
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isChinese(e.value) == false) {
			e.errorText = "必须输入中文";
			e.isValid = false;
		}
	}
}

function IDCard(e) {
	if(e.value.trim()=='') return;
	if (e.isValid) {
		var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (!pattern.test(e.value)) {
			e.errorText = "必须输入15~18位数字";
			e.isValid = false;
		}
	}
}



function isNumber(v){
	var rtn= /^[-+]?[0-9]+(\.[0-9]+)?$/g.test(v);
	return rtn;
}

////////////////////////////////////
/* 是否英文 */
function isEnglish(v) {
	var rtn= /^[a-zA-Z\_]+$/g.test(v);
	return rtn;
}

/* 是否英文+数字 */
function isEnglishAndNumber(v) {
	var rtn= /^[0-9a-zA-Z\_]+$/g.test(v);
	return rtn;
}

/**
 * 英文字母开头，只含有英文字母、数字和下划线
 * @param v
 */
function isKeyLabel(v){
	var rtn= /^[a-zA-Z][a-zA-Z0-9_]*$/g.test(v);
	return rtn;
}


function onUrlValidation(e){
	if (e.isValid) {
		if (isUrl(e.value) == false) {
			e.errorText = "必须输入合法Url地址,如http://redxun.cn或ftp://redxun.cn/acc";
			e.isValid = false;
		}
	}
}


/**
 * 是否为URL
 * @param v
 * @returns {Boolean}
 */
function isUrl(v){
	var reg=new RegExp("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$"); 
	var rtn= reg.test(v);
	return rtn;
}
/**
 * 是否为email
 * @param v
 * @returns {Boolean}
 */
function isEmail(v){
	var rtn= /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/g.test(v);
	return rtn;
}

function onEmailValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isEmail(e.value) == false) {
			e.errorText = "必须输入合法Email地址,如chshxuan@163.com";
			e.isValid = false;
		}
	}
}

/**
 * 是否为整数（正负整数）
 * @param v
 */
function isInteger(v){
	var rtn= /^-?[1-9]\d*$/g.test(v);
	return rtn;
}

function onIntegerValidation(e){
	if (e.isValid) {
		if (isInteger(e.value) == false) {
			e.errorText = "必须输入正负整数，如:1或-10";
			e.isValid = false;
		}
	}
}

/**
 * 是否为正整数
 * @param v
 * @returns {Boolean}
 */
function isPositiveInteger(v){
	var rtn= /^[1-9]\d*$/g.test(v);
	return rtn;
}

function onPositiveIntegerValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isPositiveInteger(e.value) == false) {
			e.errorText = "必须输入正整数，如:10";
			e.isValid = false;
		}
	}
}

/**
 * 是否为负整数
 * @param v
 * @returns {Boolean}
 */
function isNegtiveInteger(v){
	var rtn= /^-[1-9]\d*$/g.test(v);
	return rtn;
}

function onNegtiveIntegerValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isNegtiveInteger(e.value) == false) {
			e.errorText = "必须输入负整数，如:-10";
			e.isValid = false;
		}
	}
}

function onUniqueValidation(e){
	var sender=e.sender;
	if(!e.value && sender.required) {
		e.isValid = false;
		return;
	}
	
	if(!e.value) {
		e.isValid = true;
		return;
	}
	var el=$(sender.el);
	var parent=el.closest("div[boDefId]");
	var boDefId= parent.attr("boDefId");
	var pk=mini.getByName("ID_",parent[0]);
	var data={"value":e.value,"boDefId":boDefId,"fieldName":e.sender.name};
	if(pk){
		var pkId=pk.getValue();
		data.pkId=pkId;
	}
	$.ajax({
		type:"post",
		async:false,
		url:__rootPath+"/sys/customform/sysCustomFormSetting/validateFieldUnique.do",
		data:data,
		success:function(result){
			if(result.success){
				e.isValid = true;
			}else{
				e.errorText = "值不唯一";
				e.isValid = false;
			}
		}
	});	
	
}

/**
 * 是否为浮点数（正负浮点数）
 * @param v
 */
function isFloat(v){
	var rtn= /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/g.test(v);
	return rtn;
}

function onFloatValidation(e){
	if (e.isValid) {
		if (isFloat(e.value) == false) {
			e.errorText = "必须输入正负浮点数，如:10.223";
			e.isValid = false;
		}
	}
}

/**
 * 是否为正浮点数
 * @param v
 * @returns {Boolean}
 */
function isPositiveFloat(v){
	var rtn= /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/g.test(v);
	return rtn;
}

function onPositiveFloatValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isPositiveFloat(e.value) == false) {
			e.errorText = "必须输入正浮点数，如:10.223";
			e.isValid = false;
		}
	}
}

/**
 * 是否为负浮点数
 * @param v
 * @returns {Boolean}
 */
function isNegtiveFloat(v){
	var rtn= /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/g.test(v);
	return rtn;
	
}

function onNegtiveFloatValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isNegtiveFloat(e.value) == false) {
			e.errorText = "必须输入负浮点数，如:-10.223";
			e.isValid = false;
		}
	}
}


/**
 * 是否为中国邮政编码（6位数字）
 */
function isChinesePostCode(v){
	var rtn= /^[1-9]\d{5}(?!\d)$/g.test(v);
	return rtn;
}

function onChinesePostCodeValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isChinesePostCode(e.value) == false) {
			e.errorText = "必须输入邮政编码，如:520403";
			e.isValid = false;
		}
	}
}

/**
 * 是否为中国固话
 * 匹配国内电话号码，匹配形式如 0511-4405222 或 021-87888822
 * @param v
 */
function isChinsePhone(v){
	var rtn= /^\d{3}-\d{8}|\d{4}-\d{7}$/g.test(v);
	return rtn;
}

function onChinsePhoneValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isChinsePhone(e.value) == false) {
			e.errorText = "必须输入国内固定电话号码，如:0511-4405222 或 021-87888822";
			e.isValid = false;
		}
	}
}

/**
 * 是否为中国手机号,其必须以下号码开头
 * 
 * 移动：134、135、136、137、138、139、150、151、157(TD)、158、159、187、188
 * 联通：130、131、132、152、155、156、185、186
 * 电信：133、153、180、189、（1349卫通）
 * 
 * @param v
 */
function isChineseMobile(v){
	var re=new RegExp("^((13[0-9])|(15[^4,\\D])|(18[0,2,3,5-9]))\\d{8}$");
	if (re.test(v)){
		return true;
	}
	return false;
}

function onChineseMobileValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isChineseMobile(e.value) == false) {
			e.errorText = "必须输入国内移动手机号码";
			e.isValid = false;
		}
	}
}

/**
 * 是否为IP地址
 * @param v
 * @returns {Boolean}
 */
function isIP(v){
	var rtn= /^\d+\.\d+\.\d+\.\d+$/g.test(v);
	return rtn;
}

function onIpValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isIP(e.value) == false) {
			e.errorText = "必须输入IP地址，如192.168.1.2";
			e.isValid = false;
		}
	}
}

/**
 * 是否为QQ
 * @param v
 * @returns {Boolean}
 */
function isQQ(v){
	var rtn= /^[1-9][0-9]{4,}$/g.test(v);
	return rtn;
}

function onQqValidation(e){
	if(e.value.trim()=='') return;
	if (e.isValid) {
		if (isQQ(e.value) == false) {
			e.errorText = "必须输入QQ号，腾讯QQ号从10000开始";
			e.isValid = false;
		}
	}
}

/* 是否汉字 */
function isChinese(v) {
	var re = new RegExp("^[\u4e00-\u9fa5]+$");
	return re.test(v);
}

/*自定义vtype*/
$(function(){
	mini.VTypes["englishErrorText"] = "请输入英文";
	mini.VTypes["english"] = function(v) {
		var re = new RegExp("^[a-zA-Z\_]+$");
		if (re.test(v))
			return true;
		return false;
	};

	mini.VTypes["chineseErrorText"]="请输入中文";
	mini.VTypes["chinese"] = function(v) {
		var re =  new RegExp("^[\u4e00-\u9fa5]+$");
		if (re.test(v))
			return true;
		return false;
	};

	mini.VTypes["keyErrorText"]="英文字母开头，只含有英文字母、数字和下划线！";
	mini.VTypes['key']=function(v){
		return isKeyLabel(v);
	};
});


/**
 * 产生Html Tag的内容
 * @param tag
 * @param attrs
 */
function genTagHtml(tag,attrs){
	var str='<'+tag + ' ';
	for(var key in attrs){
    	if(key=='__proto__')continue;
		str+= key + '="' + attrs[key]+ '" ';
    }
	str+='>';
	return str;
}

/**
 * 根据汉字获取拼音。
 * @param name	目标控件ID
 * @param val	输入的汉字
 * @returns
 */
function getPy(name,val){
	if(!val) return; 
	var key=mini.get(name);
	if(!key) return;
	if(key.getValue()) return;
	$.ajax({
		url:__rootPath+'/pub/base/baseService/getPinyin.do',
		method:'POST',
		data:{words:val,isCap:'false',isHead:'true'},
		success:function(result){
			key.setValue(result.data);
		}
	});
	
}

/**
 * 将汉字转换成拼音。
 * @param val		汉字
 * @param callBack	回调方法。
 * @returns
 */
function convertToPy(val,callBack){
	if(!val) return;
	var url=__rootPath+'/pub/base/baseService/getPinyin.do';
	$.post(url,{words:val,isCap:'false',isHead:'true'},function(result){
		callBack(result.data)
	})
}

