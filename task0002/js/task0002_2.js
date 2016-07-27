$(document).ready(function(){
	var INTERVAL = 1000,
		date = new Date(),
		timeOut = 0;
	var flash = function(){
		var d = Math.floor(timeOut / 86400000);
		var h = Math.floor(timeOut % 86400000 / 3600000);
		var m = Math.floor(timeOut % 3600000 / 60000);
		var s = Math.floor(timeOut % 60000 / 1000);
		var str = '距离' + date.slice(0, 4) + '年' 
				+ date.slice(5, 7) + '月'
				+ date.slice(8, 10) + '日还有'
				+ d + '天'
				+ h + '小时'
				+ m + '分'
				+ s +'秒';
		$('#output').html(str);
	};	
	var handler = function(){
		var regexp = /^\d{4}-\d{2}-\d{2}$/;
		date = $('#input')[0].value;
		if (date.match(regexp)) {
			timeOut = new Date(date) - new Date(); 
			$('#error').html('');
			setTimeout(function() {
				flash();
				if (timeOut > 0) {
					setTimeout(arguments.callee, INTERVAL);
					timeOut -= 1000;
				};
			}, INTERVAL);
		} else {
			$('#error').html('请输入正确日期格式');
		}
	};
	$('#start').on('click',handler);

});