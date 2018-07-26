# Web 存储

HTML5 提供了两种在客户端存储数据的新方法：

* localStorage - 没有时间限制的数据存储
* sessionStorage - 针对一个 session 的数据存储

[借鉴](http://www.w3school.com.cn/html5/html_5_webstorage.asp)

## localStorage

__特点__：

* localStorage遵守同源策略，不同网站之间的不共享,只支持string型的存储,但是页面关闭后可重见

* 不像cookie一样有过期一说，除非是在本地删除掉了

* 大小支持有限，chrome 5M，IE 1630K，safari 2560K

--------------
>_判断是否浏览器支持_

``` js
if(window.localStorage){
     console.log('233');
}else {
     console.log('gg');
}
```

>_获取当前的localStorage信息_

``` js
var storage = window.localStorage;

function showStorage() {
    for (var i = 0; i < storage.length; i++) {
        //key(i)获得相应的键，再用getItem()方法获得对应的值
        console.log(storage.key(i) + " : " + storage.getItem(storage.key(i)) + "<br>");
    }
}
```

>_localStorage的读取删除(官方建议用getItem系列)_

``` js
localStorage.a = 3;//设置a为"3"
localStorage["a"] = "sfsf";//设置a为"sfsf"，覆盖上面的值
localStorage.setItem("b","isaac");//设置b为"isaac"
var a1 = localStorage["a"];//获取a的值
var a2 = localStorage.a;//获取a的值
var b = localStorage.getItem("b");//获取b的值
localStorage.removeItem("c");//清除c的值
```

>_localStorage本地控制台计数器（验证保存数据功能）_

``` js
function timer() {
    var storage = window.localStorage;
    if (!storage.getItem("pageCount")) {
        storage.setItem("pageCount", 0);
    } else {
        storage.pageCount = parseInt(storage.pageCount) + 1;
    }
    console.log(storage.pageCount);
}
```

>_直观地使用localStorage实现刷新计数(注意放在html内容之前加载)_

``` js
if (localStorage.pagecount) {
  localStorage.pagecount = Number(localStorage.pagecount) + 1;
} else {
  localStorage.pagecount = 1;
}
document.write("Visits " + localStorage.pagecount + " time(s).");
```

>_测试localStorage大小代码_

``` js
(function() {
  if(!window.localStorage) {
  console.log('当前浏览器不支持localStorage!')
  }
  var test = '0123456789';
  var add = function(num) {
    num += num;
    if(num.length == 10240) {
      test = num;
      return;
    }
    add(num);
  }
  add(test);
  var sum = test;
  var show = setInterval(function(){
     sum += test;
     try {
      window.localStorage.removeItem('test');
      window.localStorage.setItem('test', sum);
      console.log(sum.length / 1024 + 'KB');
     } catch(e) {
      console.log(sum.length / 1024 + 'KB超出最大限制');
      clearInterval(show);
     }
  }, 0.1)
})()
```

-------------;

## sessionStorage

__特点__:

* 数据会在页面会话结束后被删除
* 页面会话在刷新也就是重新加载，页面没被关掉会恢复会话，关掉页面致使保存数据清掉
* 和localStorage一样有着同源策略影响，不同页面间不可共享变量

__使用场景__：浏览器因意外情况刷新页面，可保留原有的一些重要数据不丢失

---------;

>刷新实例计数器：

``` js
if (sessionStorage.pagecount)
{
    sessionStorage.pagecount=Number(sessionStorage.pagecount) +1;
}
else
{
    sessionStorage.pagecount=1;
}
document.write("Visits " + sessionStorage.pagecount + " time(s) this session.");
```

## HTML 5 应用缓存 manifest

__评价__：坑多不建议使用，比如改变了引用的缓存的css内容，不会产生样式改动而是需要手动更改manifest内部的内容，好像下载js方面也会有问题。

[借鉴](http://blog.sina.com.cn/s/blog_70a3539f0101eqns.html)
