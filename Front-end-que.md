# Web 前端开发面试题

__前言:__
有一些概念不总是记得住的，面试的时候不要因为一些基础概念的考察而丢分

-----------

## HTML

### HTML5新特性

### HTML5移动兼容性

[这是一条经验贴](http://www.mamicode.com/info-detail-1848730.html)

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

## javascript

### 除了canvas和js，用什么实现过动画吗？

    window.requestAnimationFrame()

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

### 那些操作会造成内存泄漏？

* 意外全局变量

* 闭包

* 未清理额DOM元素引用

* 被遗忘的定时器和回调

* 引用计数问题

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

## 计网

### 从输入URL到页面加载完成的过程中都发生了什么事

[主要](https://www.jianshu.com/p/71cf7f69eca8)
[具体](https://segmentfault.com/a/1190000006879700)

ps:突然意识到重绘与重排的重排是reflow，也就是书上写的回流

## Webpack（感觉用都没有用太好，到水平了再去看源码吧orz）

### Webpack原理

### Webpack热更新即webpack-dev-server原理



