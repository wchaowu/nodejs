//扩展Date的format方法
var format =exports.format = function(date , format){ 
	
  var o = { 
	"M+" : date.getMonth()+1, 
	"d+" : date.getDate(),    
	"h+" : date.getHours(),   
	"m+" : date.getMinutes(), 
	"s+" : date.getSeconds(), 
	"q+" : Math.floor((date.getMonth()+3)/3),
	"S" : date.getMilliseconds() 
  } 
  if(/(y+)/.test(format)){
		format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4 - RegExp.$1.length));
  } 
  for(var k in o){
	if(new RegExp("("+ k +")").test(format)) {
		 format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	}
  }
  return format; 
}

/**
 *转换日期对象为日期字符串
 * @param date 日期对象
 * @param isFull 是否为完整的日期数据,
 *               为true时, 格式如"2000-03-05 01:05:04"
 *               为false时, 格式如 "2000-03-05"
 * @return 符合要求的日期字符串
 */
var getSmpFormatDate = exports.getSmpFormatDate = function(date,isFull){
	var pattern = "";
	if (isFull==true||isFull==undefined) {
		pattern = "yyyy-MM-dd hh:mm:ss";
	} else {
		pattern = "yyyy-MM-dd";
	}
	return getFormatDate(date,pattern);
}

/**
 *转换当前日期对象为日期字符串
 * @param date 日期对象
 * @param isFull 是否为完整的日期数据,
 *               为true时, 格式如"2000-03-05 01:05:04"
 *               为false时, 格式如 "2000-03-05"
 * @return 符合要求的日期字符串
 */
exports.getSmpFormatNowDate = function(isFull){
	return getSmpFormatDate(new Date(),isFull);
}

/**
 *转换long值为日期字符串
 * @param l long值
 * @param isFull 是否为完整的日期数据,
 *               为true时, 格式如"2000-03-05 01:05:04"
 *               为false时, 格式如 "2000-03-05"
 * @return 符合要求的日期字符串
 */
exports.getSmpFormatDateByLong = function(l,isFull){
	return getSmpFormatDate(new Date(l),isFull);
}

/**
 *转换long值为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
exports.getFormatDateByLong = function(l,pattern){
	return getFormatDate(new Date(l),pattern);
}

/**
 *转换日期对象为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
var getFormatDate = exports.getFormatDate = function(date,pattern){
	if(date==undefined){
		date=new Date();
	}
	if(pattern==undefined){
		pattern="yyyy-MM-dd hh:mm:ss";
	}
	return format(date , pattern);
}