for(var i=1;i<=4;i++){
	var time=setTimeout(function(i){
		clearTimeout(time);
                console.log(i);
	},1000,i);
}
//输出结果1,2,3
