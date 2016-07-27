$(document).ready(function(){

	var SPLIT_EXG = /[、;；,，\s]/;
	var splitStr = function(str,splitExg){
	  var hobbies = str.split(splitExg);
	  hobbies = cleanStr(hobbies);
	 $('#output').html(hobbies.join(" / "));
	};
	var cleanStr = function (arr) {
	  var i = 0,
	      len = arr.length,
	      result = [];
	  for (; i < len; i++) {
	    if(!arr[i].match(/^\s*$/) && result.indexOf(arr[i]) === -1) {
	      result.push(arr[i]);
	    }
	  }
	  return result;
	}
	$('#start').on("click",function(){
	    var hobbiStr = $('input')[0].value;
	    if (hobbiStr !== '') {
	    	splitStr(hobbiStr,SPLIT_EXG);
	    } else {
	    	throw new Error("hobbies is empty.")
	    }
	});

	
});