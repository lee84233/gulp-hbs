
// iconfont
var iconfontUrl = '//at.alicdn.com/t/font_1473830886_520488.css';
$('#iconfont').attr('href',iconfontUrl);


$(document).ready(function() {

	// IE
	if( myBrowser()=='IE' ){
		if(myBrowser("IEVersion")<=9){

			// 获取当前时间
			var currentTime = getDateFunc();
			// cookie
			if( getCookie('browserWarn')!=currentTime ){
				$('#browserCnt').show();
			}
			// 关闭浏览器提示
			$('#closeBrowser').click(function() {
				$('#browserCnt').slideUp('fast');
				setCookie('browserWarn',currentTime,'d1');
			});
		}
	}
});


/* 设定过期时间
* s20是代表20秒
* h12是代表12小时
* d30是代表30天
* setCookie("name","hayden","s20")
*/
/**
 * 设置cookie
 * @param {[string]} name  [键名]
 * @param {[string]} value [键值]
 * @param {[string]} time  [过期时间，可选 默认1天]
 * s20是代表20秒
 * h12是代表12小时
 * d30是代表30天
 */
function setCookie(name,value,time){
	time = time?time:'d1';
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
// 读取cookies
function getCookie(name){
	var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if( arr=document.cookie.match(reg) ){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
// 删除cookies
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!==null)
    document.cookie= name +"="+cval+";expires="+exp.toGMTString();
}
// 时间设置
function getsec(str){
  var str1=str.substring(1,str.length)*1;
  var str2=str.substring(0,1);
  if (str2=="s"){
    return str1*1000;
  }
  else if (str2=="h"){
    return str1*60*60*1000;
  }
  else if (str2=="d"){
    return str1*24*60*60*1000;
  }
}


// 插件扩展
;(function($){
	$.extend({
		hook:function(hookName){
			var selector;
			if ( hookName === '*' ){
			  // select all data-hooks
			  selector = '[data-hook]';
			}else if( hookName==false ){
				console.error('hook错误');
				selector = '[data-hook]';
			}else{
		      // select specific data-hook
		      selector = '[data-hook*="'+hookName+'"]';
	    	}
	    	return $(selector);
		}
	});
})(jQuery);


/**
 * [获取当前日期，格式化日期]
 * @param  {[string]} current [可选，值为某个时间戳，不填写返回当前时间]
 * @param  {[string]} style   [可选，日期格式]
 * @return {[string]}         [日期]
 * getDateFunc(); 返回当前日期
 * getDateFunc(false,'ymd'); 按指定格式返回当前日期
 * getDateFunc('Mon Aug 08 2016 08:08:00 GMT+0800','ymdHi'); 按指定格式返回指定日期
 */
function getDateFunc(current,style){
	current = current?current:false;
	style = style?style:false;
	var lcDate,needDate;

	if(!current){
		lcDate = new Date();
	}
	else{
		lcDate = new Date(current);
	}

	var lc_year = lcDate.getFullYear(); //获取完整的年份(4位,1970-????)
	var lc_month = lcDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
	var lc_date = lcDate.getDate(); //获取当前日(1-31)
	var lc_day = lcDate.getDay(); //获取当前星期X(0-6,0代表星期天)
	var lc_h = lcDate.getHours(); //获取当前小时数(0-23)
	var lc_m = lcDate.getMinutes(); //获取当前分钟数(0-59)
	var lc_s = lcDate.getSeconds(); //获取当前秒数(0-59)

	if( !style || style==="ymd"){
		needDate = lc_year+'-'+lc_month+'-'+lc_date;
	}
	else if(style==="ymdHi"){
		needDate = lc_year+'-'+lc_month+'-'+lc_date+' '+lc_h+':'+lc_m;
	}
	else if(style==="ymdHis"){
		needDate = lc_year+'-'+lc_month+'-'+lc_date+' '+lc_h+':'+lc_m+':'+lc_s;
	}else{
		console.error('请输入正确的时间格式');
	}

	return needDate;

}


/**
 * 判断浏览器
 * @param  {[bool]} IEVersion [可选，判断IE版本时值为true]
 * @return {[str]}           [浏览器版本]
 * myBrowser();
 */
function myBrowser(IEVersion){
	IEVersion = IEVersion?IEVersion:false;
	// 取得浏览器的userAgent字符串
  	var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    // 判断是否IE浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;

    // 判定浏览器
    if(IEVersion!=="IEVersion"){
	    //判断是否Opera浏览器
	    if (isOpera) {
	        return "Opera";
	    }
	    //判断是否Firefox浏览器
	    if (userAgent.indexOf("Firefox") > -1) {
	        return "FF";
	    }
	    //判断是否Chrome浏览器
	    if (userAgent.indexOf("Chrome") > -1){
		 		return "Chrome";
			}
			//判断是否Safari浏览器
	    if (userAgent.indexOf("Safari") > -1) {
	        return "Safari";
	    }
	    //判断是否IE浏览器
	    if (isIE) {
	        return "IE";
	    }
    }else{  // 判定IE版本
    	var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp['$1']);
		if (fIEVersion == 7) {
			return 7;
		} else if (fIEVersion == 8) {
			return 8;
		} else if (fIEVersion == 9) {
			return 9;
		} else if (fIEVersion == 10) {
			return 10;
		} else if (fIEVersion == 11) {
			return 11;
		} else if (fIEVersion == 12){
			return 12;
		} else {
			console.error('我不清楚这是什么浏览器');
		}
    }
}