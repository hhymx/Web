function getstyle(obj, attr) { //获取页面元素样式,obj节点，attr要获取的样式
	if(window.getComputedStyle) {
		//支持IE9+, 谷歌, 火狐..	
		//var style = window.getComputedStyle("元素", "伪类")[样式];
		return getComputedStyle(obj, null)[attr];
	} else {
		return obj.currentStyle[attr]; //支持IE8-
	}
}
/**
 * 缓冲函数
 * @param {Object} end 结束坐标px
 * @param {Object} obj 节点
 * @param {Number} timer 完成时间
 */
function buffer(end, obj, timer) { 
	var time;
	clearInterval(time);
	var start = obj.offsetLeft;
	var speed=10;
	time = setInterval(function() {
		start = obj.offsetLeft;
		speed = (end - start) /(timer*10) ; //速度
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(start == end) {
			clearInterval(time); //停止定时器
		} else {
			obj.style.left = start + speed + "px";
		}
	}, 100);
	
}
/**
 * 渐变颜色
 * @param {Object} obj 需要渐变的节点
 * @param {Number} start 开始透明度0-1
 * @param {Number} end 结束透明度0-1
 * @param {Number} timer 持续时间0.1-10秒
 */
function color(obj, start, end, timer) { 
	obj.style.opacity = start;
	var speed = (end - start) / (timer * 10);
	var sty = 1;
	var time = setInterval(function() {
		sty = Number(getstyle(obj, "opacity"));
		sty = Math.round(sty * 1000) / 1000;
		//console.log(sty+"+"+speed+"="+(sty+speed));
		if(sty == end) {
			clearInterval(time);
		} else {
			(sty + speed) < 0 ? obj.style.opacity = 0 : obj.style.opacity = sty + speed;
			obj.style.filter = "alpha(opacity=" + 100 + ")";
		}
	}, 100);

}
/**
 * 弹性运动 : 让物体进行弹性运动;
 * @param {Object} end 结束位置
 * @param {Number} iSpeed 速度
 * @param {Object} obj 目标节点
 */
function elastic(end, iSpeed, obj) { 
	var timer = setInterval(function() {
		var start = obj.offsetLeft;
		iSpeed += (end - start) / 5;
		iSpeed *= 0.7; //摩擦系数
		obj.style.left = start + iSpeed + "px";
		//判断是否到临界值，当速度很小时已经当前值接近目标值时，
		if(Math.abs(iSpeed) < 1 && Math.abs(end - start) < 1) { //if(start==end){
			obj.style.left = end + "px"; //left = 目标值		
			clearInterval(timer);
		}
	}, 100)
}
/**
 * 
 * @param {Object} obj 圆点数组
 */
function yuandian(obj,index,num,colour) {
	for (var i=0;i<obj.length;i++) {
		obj[i].style.backgroundColor="";
	}
	if (index==num) {
		index=0;
	}else if (index==-1) {
		index=num-1;
	}
	obj[index].style.backgroundColor=colour;
	return index;
}