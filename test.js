async function getData(){
	//请求数据1
	var data1 = await new Promise((resolve) => {
		setTimeout(() => resolve('Brelly'),1000);
	});
	//在1请求完之后请求2，请求2依赖请求1
	var data2 = await new Promise((resolve) => {
		setTimeout(() => resolve('liaoliao'),1000);
	});
	console.log(data2);
}
getData();