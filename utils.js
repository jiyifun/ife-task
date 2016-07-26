/**
 * 判断arr是否为一个数组 
 * @param  {[type]}
 * @return {Boolean}
 */
function isArray(arr) {
	// 以下方法在跨frame时会失效
	// return arr &&
	// 	typeof arr === 'object' &&
	// 	arr.constructor === Array;

	// better
	return Object.prototype.toString.call(arr) ===
		'[object Array]';
}
/**
 * 判断fn是否为一个函数
 * @param  {Function}
 * @return {Boolean}
 */
function isFunction(fn) {
	// 同样是不能跨frame使用
	// return fn instanceof Function();

	// 这种在较老的chrome上正则表达式（/a/）结果也是显示‘function’
	// return typeof fn === "function";

	return Object.prototype.toString.call(fn) === '[object Function]';

}
/**
 * @param  {[type]}
 * @return {[type]}
 */
function cloneObject(src) {
	var srcType = Object.prototype.toString.call(src),
		obj = src,
		prop;
	switch(srcType) {
		// 日期类型
		case  '[object Date]' :
			obj = new Date(src.getDate());
			break;
		// 字符串类型
		case  '[objcet String]' :
			obj = new String(src);
			break;
		// Boolean类型
		case  '[objcet Boolean]' :
			obj = new Boolean(src);
			break;
		// Array 类型
		case  '[objcet Array]' :
			obj = [];
			for (prop in src) {
				obj[prop] = cloneObject(src[prop]);
			}
			break;
		// Objcet类型
		case  '[object Object]': 
			obj = {};
			for (prop in src) {
				if(src.hasOwnProperty(prop)){
					obj[prop] = cloneObject(src[prop]);
				}
			}
			break;
		// 其他情况
		default:
			break;
	}
	return obj;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

/**
 * 数组去重
 * @param  {[type]}
 * @return {[type]}
 */
function uniqArray(arr) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (result.indexOf(arr[i]) == -1) {
			result.push(arr[i]);
			console.log('push');
		}
		console.log(result);
	};
	return result;
}


// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]


/**
 * 去除空格
 * @param  {[type]}
 * @return {[type]}
 */
function trim(str) {

	return str.replace(/^\s+|\s+$/g,'');
}

function each(arr, fn) {
	for (var i = 0; i < arr.length; i++) {
		fn(arr[i], i);
	};
}


// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var count = 0;
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			count++;
		};
	};
	return count;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3


// 判断是否为邮箱地址
function isEmail(emailStr) {
	var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return emailRegExp.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
	var phoneRegExp = /^\d{11}$/;
	return phoneRegExp.test(phone);
}

function addClass(element, newClassName) {
	element.className += ('' + newClassName);
}

function removeClass(element, oldClassName) {
	var index = element.className.indexOf(oldClassName);
	if (index != -1) {
		element.className = element.className.splice(index,oldClassName.length);
	};
}

function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

function getPosition(element) {
    var actualLeft = element.offsetLeft || 0;
    var actualTop = element.offsetTop || 0;
    var current = element.offsetParent;
    while (current != null) {
    	actualLeft += current.offsetLeft;
    	actualTop += current.offsetTop;
    	current = element.offsetParent;
    }
    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    // element.getBoundingClientRect()

    actualLeft -= scrollLeft;
    actualTop -= scrollTop;

    return {x:actualLeft , y:actualTop};
}

// 实现一个简单的Query
function $(selector) {
   var sArr = trim(selector).split(' ');
   console.log(sArr);
   var ele = document;

   for (var i = 0; i < sArr.length; i++) {
   		if (ele == null) {
   			return ele;
   		};
   		switch(sArr[i][0]){
   			case '#' :
   				ele = ele.getElementById(sArr[i].slice(1));
   				break;
   			case '.' :
   				ele = ele.getElementsByClassName(sArr[i].substring(1));
   				break;
   			case '[' :
   				var valueIndex = sArr[i].indexOf('=');
   				var tmp = ele.getElementsByTagName('*');
   				var tLen = tmp.length;
   				if (valueIndex == -1) {
   					var key = sArr[i].slice(1);
   					for (var j = 0; j < tLen; j++) {
   						if (tmp[j] == key) {
   							ele = tmp[j];
   							break;
   						};
   					};
   				} else {
   					var key = sArr[i].slice(1, valueIndex);
   					var value = sArr[i].slice(valueIndex + 1);
   					for (var j = 0; j < tLen; j++) {
   						if (tmp[j][key] == value) {
   							ele = tmp[j];
   							break;
   						};
   					};
   				};
   				break;
   			default: 
   				ele = ele.getElementsByTagName(sArr[i])[0];
   		}
   };

   if (!ele) {
   		ele = null;
   };

   return ele;

}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
