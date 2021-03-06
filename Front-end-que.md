# Web 前端开发面试题

__前言:__
面试题往往会涉及前端领域的核心，借用面试题来以点画面真的是不错的学习方法。另外计算机网络博大精深真的没想好怎么去啃书学，所以结合面试题的话感觉多数都是http系列相关内容。。。

-----------

## HTML

### HTML5新特性

### HTML5移动兼容性

[这是一条经验贴](http://www.mamicode.com/info-detail-1848730.html)

> mousedown、click、mouseup、touchstart、touchend执行顺序？

```txt
mousedown、mouseup在移动端上是没有的。。。直接看touchstart、touchend（延迟200ms左右）、click（延迟300ms左右）。难倒不难，里面有坑
```

### meta头
[较全](https://www.cnblogs.com/y-lin/p/5798119.html)

## 浏览器内核，渲染，兼容性

### 页面DOM重绘与页面重排

>简述重排的概念

浏览器下载完页面中的所有组件（HTML、JavaScript、CSS、图片）之后会解析生成两个内部数据结构（DOM树和渲染树），DOM树表示页面结构，渲染树表示DOM节点如何显示。重排是DOM元素的几何属性变化，DOM树的结构变化，渲染树需要重新计算。

>简述重绘的概念

重绘是一个元素外观的改变所触发的浏览器行为，例如改变visibility、outline、背景色等属性。浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但table及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍时间，这就是我们尽量避免使用table布局页面的原因之一。

> 简述重绘和重排的关系

重绘不会引起重排，但重排一定会引起重绘，一个元素的重排通常会带来一系列的反应，甚至触发整个文档的重排和重绘，性能代价是高昂的。

> 什么情况下会触发重排？

1)页面渲染初始化时；（这个无法避免）

2)浏览器窗口改变尺寸；

3)元素尺寸改变时；

4)元素位置改变时；

5)元素内容改变时；

6)添加或删除可见的DOM 元素时。

> 重排优化有如下五种方法

1)将多次改变样式属性的操作合并成一次操作，减少DOM访问。

2)如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排。（fragment元素的应用）

3)将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。

4)由于display属性为none的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发两次重排。

5)在内存中多次操作节点，完成后再添加到文档中去。例如要异步获取表格数据，渲染到页面。可以先取得数据后在内存中构建整个表格的html片段，再一次性添加到文档中去，而不是循环添加每一行。

### 浏览器线程的理解

[参考](https://blog.csdn.net/w2765006513/article/details/53743051)

### 简述DOM与BOM的区别

### 事件冒泡与事件捕获，事件委托

## CSS

### CSS 中 inline 元素可以设置 padding 和 margin 吗？

首先inline元素的高度和宽度是由元素中的呢内容（包括字体大小和行高影响）决定的。对inline元素设置高宽是无效的，如果你想对元素设置高宽的话，可以将元素设置为inline-block.

inline元素也是符合盒子模型的，所以为她设置margin和padding是有效的。
而从视觉效果上看左右有效，上下无效

### queryselector

### nth-child和nth-of-type区别

### GPU加速方案

### 什么是层叠上下文

### css实现三角形

```CSS
#test
{
    border:100px solid #fff;
    border-left: 100px solid red;
    width: 0px;
    height: 0px
}
```

## javascript

### 用什么实现过动画吗？（或者说逐帧动画）

canvas是表现方式不是方法总是。。。。，方法倒是下面几个，除了第一个也都算用过。

* gif动画
* window.requestAnimationFrame()
* setInterval
* css 3 的animation @keyframes

[参考1](https://blog.csdn.net/w2765006513/article/details/53843169)
[参考2](https://segmentfault.com/a/1190000010229232)

### js三大对象

* 本地对象（可通过new创建实例）：包含：Object、Array、Date、RegExp、Function、Boolean、Number、String等。
* 内置对象（本身就是实例化对象）:包含：Global和Math
* 宿主对象（包含宿主提供，自定义类对象）：所有的DOM对象和BOM对象都属于宿主对象

### js基本规范

* 减少全局污染
* 变量名自行提升
* for循环中保存变量
* 用'==='代替'=='
* 用花括号
* 命名规范
* 写注释
* 不要在同一行内声明多个变量
* switch语句中必须带有default分支

### 对json的了解

> 特点：

不支持变量函数或对象实例，是一种结构化数据的格式。比xml轻快

>比较：

与对象字面量相比

1、不用变量声明与结尾分号

2、属性名必须加双引号（注意单引号不可以）

>json对象方法：

1、stringfy(),将一个对象序列化为JSON字符串，序列化过程中所有的函数和原型成员都会被忽略，值为undefined的任何属性也会被跳过。第二个参数是筛选属性数组，或者回调函数第三个参数是缩进字符（含填充字符）注意toJSON方法（对象自定义序列化）的序列化顺序高于二参数，高于三参数

2、parse()将JSON字符串转换为对象，同样支持第二个参数的函数回调

```js
//小例子
var liao = {"math":59,"english":59,"sport":100};
function replacer(k,v){
    if(liao[k]<=60){
        liao[k] = undefined;
    }else{
        return v;
    }
}
liao = JSON.stringify(liao,replacer);
console.log(liao);
```
### e.target与e.currentTarget的区别

前者指向触发事件监听的对象，后者指向添加监听事件的对象。

### 那些操作会造成内存泄漏？

* 意外全局变量

* 闭包

* 未清理额DOM元素引用

* 被遗忘的定时器和回调

* 引用计数问题(在一个函数内互相引用，即循环引用)

[垃圾回收机制系列](https://blog.csdn.net/michael8512/article/details/77888000)

### 检测浏览器版本版本有哪些方式？

>通过浏览器特征来判断(速度快，特性可能会消失))

```js
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
window.ActiveXObject ? Sys.ie = ua.match(/msie ([\d.]+)/)[1] :
document.getBoxObjectFor ? Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1] :
window.MessageEvent && !document.getBoxObjectFor ? Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1] :
window.opera ? Sys.opera = ua.match(/opera.([\d.]+)/)[1] :
window.openDatabase ? Sys.safari = ua.match(/version\/([\d.]+)/)[1] : 0;       
//以下进行测试
if(Sys.ie) document.write('IE: '+Sys.ie);
if(Sys.firefox) document.write('Firefox: '+Sys.firefox);
if(Sys.chrome) document.write('Chrome: '+Sys.chrome);
if(Sys.opera) document.write('Opera: '+Sys.opera);
if(Sys.safari) document.write('Safari: '+Sys.safari);
```

>通过正则分析navigator.Agent

```js
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

//以下进行测试
if (Sys.ie) document.write('IE: ' + Sys.ie);
if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
if (Sys.opera) document.write('Opera: ' + Sys.opera);
if (Sys.safari) document.write('Safari: ' + Sys.safari);
```

### Polyfill及Polyfill方案

一般是指某个方法在某个环境下没有定义而无法使用，比如requestAnimationFrame这种或者是scroll_high这种。需要我们手写一个替代品去补充功能，一般用于处理兼容性问题。现在比较大而比较重要的Polyfill也就是转换es 6为es 5的babel了

[babel与polyfill](https://segmentfault.com/a/1190000010106158?utm_source=tuicool&utm_medium=referral)

### setIntervel和setTimeout

被问到这道题的时候倒不是他有多难，而是思维定式会给我们带来一些可能不好的回答。

>共同点

他们呢所执行的函数都会先放到事件队列里等待执行。

>不同点

setTimeout是一次性延迟执行，而setInterval是循环往复的执行，而且setInterval在实战中有一个问题就是如果窗口最小化的话，setInterval里面的任务还是会执行，然后等到窗口回来只后再统一执行最后的效果，所以通常我们用到setInterval的时候窗口最小化要有一个clearInterval()的处理emmm

>与setTimeout的机制比较

```js
var i = 0;
setInterval(function(){
    console.log(i++);
},1000);
setTimeout(() => console.log('liao'), 0);
setTimeout(() => console.log('liao'), 20);
setTimeout(() => console.log('liao'), 1000);
setTimeout(() => console.log('liao'), 1500);
setTimeout(() => console.log('liao'), 2000);
setTimeout(() => console.log('liao'), 2500);
setTimeout(() => console.log('liao'), 3000);

//嗯。。这个测试很明显了，其实就是setInterval在第一次将事件插入到事件队列的时候，是优先于setTimeout的
//后来的循环再插入到事件队列里的时候是不优先的

for(var i = 0;i<10;i++) {
    setInterval(function(){
        console.log(i);
    },1000);
    setTimeout(function(){
        console.log('liaoliao');
    },1000);
}
```

>用setTimeout实现一个setInterval

```js
//setInterval(fn, delay);
var i = 0;
var t;
function setTim(fn, delay, cancel){
    t = setTimeout(function(){
        fn();
        setTim(fn, delay);
    }, delay);
    if(i == 4){
        clearTimeout(t);
        return;
    }
}
setTim(() => console.log(i++),1000);
```

嗯。。。。水平问题，在取消循环那里封装性做的并没有setInterval那么好orz，红宝书上其实有讲用setTimeout替代setInterval的好处：

setInterval缺点

* 定时器阻塞

* 解决定时器内设立定时器无效问题

[红宝书人工](https://blog.csdn.net/baidu_24024601/article/details/51862488)

>惊了

即使消息队列是空的，0毫秒实际上也是达不到的。根据HTML 5标准，setTimeout
推迟执行的时间，最少是4毫秒。如果小于这个值，会被自动增加到4。这是为了防止多个setTimeout(f, 0)语句连续执行，造成性能问题

### slice,substr,substring的区别

先单独把slice和substring拎出来，他们呢都是两个参数分别代表截取字符串的起止位置，区别在于slice把负数当作从后计数而substring把负数当0.

```js
"hello world!".slice(-6, -1) // "world"
"hello world!".substring("abc", 5) // "hello"
```

再说substr，两个参数分别是起始位置，和从起始位置下一位开始计数的长度，第一个参数可以是负数表示从后计位，第二个参数不能小于1.

```js
"hello world!".substr(-6, 5) // "world"
"hello world!".substr(0, -1) // ""
```
### js小问

> New Date().getTime()返回什么，循环10000次输出这个值会得到几个不同的值?

```txt
一个从1970年1月1日到现在的时间戳，以毫秒为单位。400多
```

## 计网

### 从输入URL到页面加载完成的过程中都发生了什么事

[主要](https://www.jianshu.com/p/71cf7f69eca8)
[具体](https://segmentfault.com/a/1190000006879700)
[强缓存与协商缓存](https://www.cnblogs.com/wonyun/p/5524617.html)
[负载均衡](https://blog.csdn.net/github_37515779/article/details/79953788)

ps:突然意识到重绘与重排的重排是reflow，也就是书上写的回流

### Set-cookie: http-only 是干什么用的？

如果cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie

### 常见的http状态码

http状态码是表示服务器对请求的响应状态，主要分为以下几个部分

1**：这类响应是临时响应，只包含状态行和某些可选的响应头信息，并以空行结束

2**：表示请求成功，

3**：表示重定向

4**：表示客户端错误

5**：表示服务器端错误

100（continue），客户端应当继续发送请求。这个临时响应是用来通知客户端它的部分请求已经被服务器接收

200（OK），表示请求成功，请求所希望的响应头或数据体将随此响应返回。

202（Accepted），服务器已接受请求，但尚未处理。

204（No-Content），服务器成功处理了请求，但不需要返回任何实体内容

205（Reset-Content），服务器成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。该响应主要是被用于接受用户输入后，立即重置表单，以便用户能够轻松地开始另一次输入。

206（Partial-Content），服务器已经成功处理了部分 GET 请求。

301（Moved-Permanently），永久性重定向

302（Moved-Temporarily），暂时性重定向

304（Not-Modified），浏览器端缓存的资源依然有效

400（Bad-Reques），请求有误，当前请求无法被服务器理解。

401（Unauthorized），当前请求需要用户验证。

403（Forbidden），服务器已经理解请求，但是拒绝执行它。

404（Not-Found），请求的资源没有被找到

500（Interval Server Error），服务器内部错误

502（Bad GateWay），网关出错

503（Service Unavailable），由于临时的服务器维护或者过载，服务器当前无法处理请求。

504（Gateway Timeout），作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应。

### post时content-type的四种形式

[content-type](https://blog.csdn.net/zhanglf02/article/details/76201181)

### 网站如何实现离线应用

### 怎样不缓存？不使用缓存方式：在请求路径后面加rand随机数？

### 前端向后端传输数据的方法有哪些

> ajax

这个就不解释了吧，post过去

> form

在action中请求后台的方法。但是如果数值在传给后台之前需要校验，可以在form中的onsubmit调用js方法进行校验，js方法的返回值为true时，触发action，返回false时，action不起作用

>通过dom获取标签，触发标签的submit方法，直接提交数据到后台

```js
function query() {
 
    var inputs = document.getElementsByName("sex");//对象是单选选项
 
    for(var i = 0; i < inputs.length; i++) {
 
        if(inputs[i].checked) {//是否选中
  
            varsex = inputs[i].value;
 
            document.getElementById("query").action = projectName+"/query.do?currentPage=1&stsex="+ sex;
 
            break;
 
        }else{
 
            document.getElementById("query").action = projectName+"/query.do?currentPage=1";
 
        }
 
    }
 
    document.getElementById("query").submit();//提交到后台
 
}
 

```
### http协议、https协议、http2协议

这个真的很广很大，《图解HTTP》这本书我觉得很好，还有就是阮一峰前辈的两篇文章
[请见](http://www.ruanyifeng.com/blog/2016/08/http.html)
然后有一位老哥把图解HTTP的内容滕下来了，可能方便在线看吧，
[图解HTTP](https://www.cnblogs.com/zxj015/p/6530766.html)

### 常见的http请求方法

> OPTIONS

返回服务器针对特定资源所支持的HTTP请求方法，也可以利用向web服务器发送‘*’的请求来测试服务器的功能性

> HEAD

向服务器索与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。(简单说获取报文首部)

> GET

向特定的资源发出请求。它本质就是发送一个请求来取得服务器上的某一资源。资源通过一组HTTP头和呈现数据（如HTML文本，或者图片或者视频等）返回给客户端。GET请求中，永远不会包含呈现数据。

> POST

向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。 Loadrunner中对应POST请求函数：web_submit_data,web_submit_form

> PUT

向指定资源位置上传其最新内容

> DELETE

请求服务器删除Request-URL所标识的资源

> TRACE

回显服务器收到的请求，主要用于测试或诊断

> CONNECT

HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器

> 补充

方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码405（Mothod Not Allowed）；当服务器不认识或者不支持对应的请求方法时，应返回状态码501（Not Implemented）。

### get与post的区别

[哇这个](https://www.cnblogs.com/logsharing/p/8448446.html)

### 状态码301与302

301相对302是永久重定向，会计算新进入的流量（SEO相关），一般末尾忘记加斜杠的话会有这个。还有近些年大量http升级到https好像就用到了永久重定向也就是301

### Session与Cookie区别与联系

[请见](https://www.cnblogs.com/endlessdream/p/4699273.html)

### 什么是cors里的预检

对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

### DNS劫持

## 操作系统

### Epoll与selcet

感觉在看深入浅出那一部分的时候有点儿这个意思，看下博客适当理解一下吧
[参考](https://blog.csdn.net/davidsguo008/article/details/73556811)

### 进程与线程（进程间的通信方式，线程之间的通信方式）

[进程间的通信方式](https://blog.csdn.net/wh_sjc/article/details/70283843)

线程间的通信方式，这个比较冷门，比较靠谱的方法也就是通过那片共享内存来进行通信了。

### linux的内存分配方式

BSS（Block Started by Symbol）通常是指用来存放程序中未初始化的全局变量和静态变量的一块内存区域。特点是:可读写的，在程序执行之前BSS段会自动清0。所以，未初始的全局变量在程序执行之前已经成0了。

数据段：数据段（data segment）通常是指用来存放程序中已初始化的全局变量的一块内存区域。数据段属于静态内存分配。

代码段：代码段（code segment/text segment）通常是指用来存放程序执行代码的一块内存区域。这部分区域的大小在程序运行前就已经确定，并且内存区域通常属于只读, 某些架构也允许代码段为可写，即允许修改程序。在代码段中，也有可能包含一些只读的常数变量，例如字符串常量等。

堆（heap）：堆是用于存放进程运行中被动态分配的内存段，它的大小并不固定，可动态扩张或缩减。当进程调用malloc等函数分配内存时，新分配的内存就被动态添加到堆上（堆被扩张）；当利用free等函数释放内存时，被释放的内存从堆中被剔除（堆被缩减）

栈(stack)：栈又称堆栈， 是用户存放程序临时创建的局部变量，也就是说我们函数括弧“{}”中定义的变量（但不包括static声明的变量，static意味着在数据段中存放变量）。除此以外，在函数被调用时，其参数也会被压入发起调用的进程栈中，并且待到调用结束后，函数的返回值也会被存放回栈中。由于栈的先进先出特点，所以栈特别方便用来保存/恢复调用现场。从这个意义上讲，我们可以把堆栈看成一个寄存、交换临时数据的内存区

[补充](https://blog.csdn.net/zhengqijun_/article/details/51879173)

## 数据结构与算法

### 各种排序算法

见图

![见图](img/sort.jpeg)

哪个过程忘了就上网再复习下。。。附上两个讲得比较好的

[图解排序](https://www.cnblogs.com/chengxiao/p/6103002.html)

[js排序](https://www.cnblogs.com/JChen666/p/3360853.html)

### 经典问题

>20g的qq号里选一个重复次数最多的，给10M内存限制

[海量数据中淘数据大全](https://blog.csdn.net/u010601183/article/details/56481868/)

PS:留意其中同样经典的N中K问题，海量数据中n个数求第k个大的，是用桶排、快排、堆排？
这个问题可能最好的答案还是要用小顶堆

[参考](https://blog.csdn.net/bin_ge_love/article/details/51737099)

![小顶堆](img/smallheap.gif)

>平衡二叉树->AVL树->红黑树

看看至少得能想起来，深入学没边的

>有可能是海量数据中，n个数求第k大的数

思路：根据数据量的大小，桶排？快排？建堆？

## C与C++

### 经典问题

>static详解

[好文](https://www.cnblogs.com/BeyondAnyTime/p/2542315.html)

## 框架

### React和Vue的比较

[小文](https://baijiahao.baidu.com/s?id=1608210396818353443&wfr=spider&for=pc)

## Webpack（感觉用都没有用太好，到水平了再去看源码吧orz）

### Webpack原理

### Webpack热更新即webpack-dev-server原理

## 以下是系列经典小问题

* JS中的this了解吗，this指向是执行时定义还是什么时候定义的，箭头函数的this指向呢

### Webpack性能优化

在开发时我们往往会把业务代码和类库代码分开打包，这样的话就可以用缓存保住比较多的类库，每次只更改业务代码。

类库往往比较大，我们并不需要加载全部内容，dll可以剥离按需加载？

## 笔试部分

会考各种题，只能拿真题练了，忘了很多，根据笔试复习～

## 软问题

### 做项目时遇到什么困难，怎么解决的

这个问题很经典，是一个展示项目的好机会也是少的机会，虽说每个人肯定都不同，但一定想好了再回答，不要说查文档看源码这样子，而是说仔细想想自己解决了哪些问题，不一定是困难（可能是我下意识里觉得困难是解决不了的才称之为困难吧orz，所以当时答的是想想都能弄出来，其实应该借机说一波项目），不过其实最根本的方法还是看源码和断点调试。

### 有什么要问我的

个人觉得有这样的机会当然要问问自己的不足，这样才会有提高。嗯。。。写这条要注意问技术面试官合适的问题，不要问技术面试官如果有机会入职要做哪些准备这种问题，如果是个技术总监，可能会直接凉掉。。。

## 找工作

记几个不错的网址吧，给需要的人

### 实习与校招

* 赛码网
* 实习僧
* 牛客网

### 招聘

* 拉勾
* Boss直聘

猎聘和前程无忧这个没怎么用过

不喜欢大街网

### 社交

* 知乎

* 脉脉
