# Js专题

__前言:__

这一部分就是针对各种Js重点概念列出的分析和专题

## es5

### js数据类型

栈：原始数据类型undefined，Null，Boolean，Number(含NaN)，String(字符串不可修改))

堆：引用数据类型对象，数组，函数，Date

> typeof简单判定（无法区分null，数组和对象）

    typeof 2 //number
    typeof '222' //string
    typeof true //boolean
    typeof (function{}) //function
    typeof undefined //undifined
    typeof null //object
    typeof {}   //object
    typeof [] //object

>原生原型拓展函数判定

    var gettype = Object.prototype.toString
    gettype.call('aaaa')        //[object String]

    gettype.call(2222)          //[object Number]

    gettype.call(true)          //[object Boolean]

    gettype.call(undefined)     //[object Undefined]

    gettype.call(null)          //[object Null]

    gettype.call({})            //[object Object]
    gettype.call([])            //[object Array]
    gettype.call(function(){})  //[object Function]

>注意两种判定方法的大小写。。。

------------

### 变量提升

>在定义或定义赋值之前引用，会只提变量，为undefined

    console.log(foo); //undefined
    var foo = 2;

>举个详细的例子

    var tmp = new Date();
    function f() {
    console.log(tmp);
        if (false) {
            var tmp = 'hello world';
        }
    }
    f(); // undefined
    这段代码很经典，出现情况是定义赋值前引用，如果我们把后面的赋值去掉，根据前面的规则，结果还是undefined，如果只保留tmp = 'hello world'那么结果会正常输出
>函数同样存在变量提升？

    function getValue() {
        return 'c';
    }
    function functions(flag) {
        if (flag) {
            function getValue() { return 'a'; }
        } else {
            function getValue() { console.log(1);return 'b'; }
        }
        return getValue();
    }
    console.log(functions(true));
    这里本以为这一段代码最后总是会返回b，牛客上的题也是这么设计的，但后来的node环境可能做了些修正，这里其实会返回a的。。。,而且没输出1说明第二个函数解析都没解析，所以个人对函数的理解是
    ->1、函数解析本身并不存在“变量提升”
    紧接着第二个测试
    function doSth(func,a,b){
        function func(a,b) {
            return a-b;
        }
        return func(a,b);
    }
    function func(a,b) {
        return a+b;
    }
    console.log(doSth(func,1,2));

    ->2、函数的调用沿作用域链查找

    紧接着看了网上大牛的3个测试

    (function(){
    function a(){};
        var a;
        console.log(typeof a); //function
    })();
    (function(){
        console.log(typeof a);//function
        function a(){};
        var a = 1;
    })();
    (function(){
        function a(){};
        var a = 1;
        console.log(typeof(a)); //number
    })();

    ->3、js先解析再执行(会被覆盖)
>词法分析一个

    function a(){
        var b = 'a';
        function b(){
            console.log('b')
        }
        console.log(b)
    }
    a()
    //解析时
    function a(){
        var b = 'a';
        b = function b(){console.log('b')};
        console.log(b);
    }
    //执行时
    function a(){
        b = function b(){console.log('b')};
        var b = 'a';
        console.log(b);
    }
    a();
>总结：

    ES5只有全局作用域和函数作用域，没有块级作用域，因此es6新增了let，来引入块级作用域

------------

### 对闭包的理解及常见应用场景

> 闭包的三个特点

```txt
1、函数嵌套函数
2、函数内部可以引用外部的参数和变量
3、参数和变量不会被垃圾回收机制回收
```

>闭包的缺点

```txt
1、会造成内存泄漏
2、在函数中创建函数是不明智，闭包对脚本性能有负面影响，包括处理速度和内存消耗
```

以下举几个闭包典型例子～
>闭包应用场景1:保存变量

```js
先看一段代码：
function tell(){
    var a=[];
    for(var i=0;i<10;i++)//如果是块级作用域，也就你把var改成let就不会需要闭包啦
    {
        a[i]=function(){
            return i;
        }
    }
    // for(i=0;i<10;i++)
    //     console.log(a[i]());
    console.log(a[2]());
}
tell();
经典的例子，结果是10，因为作用域的问题，i循环后再调用function的时候，已经是10了。再举个跟上面很像的例子，这回用闭包解决
function count(){
    var arr = [];
    for(var i=0;i<10;i++)
    {
        arr.push(function(){
            return i*i;
        });
    }
    console.log(arr[1]());
    return arr;
}
count();
使用闭包后的修正版，闭包保存了立即函数的变量
function count(){
    var arr = [];
    for(var i=0;i<10;i++)
    {
        arr.push((function(n){
            return function(){
                return n*n;
            }
        })(i));
    }
    return arr;
}
var result = count();
console.log(result[0]());
console.log(result[5]());
```

>闭包应用场景2:函数柯里化

```js
function addsome(x){
    return function(y){
        return x+y;
    };
}
var add5 = addsome(5);
var add10 = addsome(10);
console.log(add5(1));
console.log(add10(1));
输出6和11
```

>闭包应用场景3:实现变量的私有化和公有化（用那个经典的立即执行函数当然是可以的）

```js
function create_timer(){
    var x=0;
    return {
        say:function add(){
            console.log(x++);
        }
    };
}
var said = create_timer();
for(var i=0;i<10;i++)
    said.say();
```

>闭包应用场景4:闭包应用场景4:超多的回调,像sort，map，filter，reduce他们就是不错的例子,正则里的replace附带函数,
差不多回调的最简含义如下

```js
function dosomething(callback,x,y){
    return callback(x,y);
}
function addd(x,y){
    return x+y;
}
console.log(dosomething(addd,1,2));
```

>闭包应用场景5:jQuery插件书写中，避免在插件内部使用$作为jQuery对象，而使用
完整的jQuery来表示，可以用闭包来回避这个问题

```js
;(function($){
    //sth
})(jQuery);
```

### js单线程

#### 异步与回调

>异步防止阻塞 [参考](https://www.cnblogs.com/dong-xu/p/7000163.html)

```js
//举一个同步遍历打印数组和异步回调打印数组的例子～
var arr = new Array(200);
//arr.fill(1);
for(var i=0;i<arr.length;i++)
    arr[i]=i;
function ascyprint(arr,handle){
    var t = setInterval(function(){
        if(!arr.length){
            clearInterval(t);
        }else{
            handle(arr.shift());
        }
    },0);
}
ascyprint(arr,function(value){
    console.log(value);
});
arr.forEach(function(index,value,arr){
    console.log(value);
});
```

>页面上回调使用实例

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p id="test">大家好，我是布莱利liaoliao</p>
    <button type="submit">12px</button>
    <button type="submit">24px</button>
    <button type="submit">48px</button>
    <script>
        var pp = document.getElementById('test')
        function changesize(x){
            return function(){
                pp.style.fontSize = x+"px";
            };
        }
        var size1 = changesize(12);
        var size2 = changesize(24);
        var size3 = changesize(48);
        var btn=document.getElementsByTagName('button');
        if(btn[0].type == 'submit')
            console.log(1);
        btn[0].onclick = size1;
        btn[1].onclick = size2;
        btn[2].onclick = size3;
        </script>
</body>
</html>
```

#### 事件循环与任务队列

>事件循环

    JS 会创建一个类似于 while (true) 的循环，每执行一次循环体的过程称之为 Tick。每次 Tick 的过程就是查看是否有待处理事件，如果有则取出相关事件及回调函数放入执行栈中由主线程执行。待处理的事件会存储在一个任务队列中，也就是每次 Tick 会查看任务队列中是否有需要执行的任务。

>任务队列

    异步操作会将相关回调添加到任务队列中。而不同的异步操作添加到任务队列的时机也不同，如 onclick, setTimeout, ajax 处理的方式都不同，这些异步操作是由浏览器内核的 webcore 来执行的，webcore 包含上图中的3种 webAPI，分别是 DOM Binding、network、timer模块。
    举例：
    1、onclick 由浏览器内核的 DOM Binding 模块来处理，当事件触发的时候，回调函数会立即添加到任务队列中
    2、setTimeout 会由浏览器内核的 timer 模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中
    3、ajax 则会由浏览器内核的 network 模块来处理，在网络请求完成返回之后，才将回调添加到任务队列中。
>主线程 [参考](https://www.cnblogs.com/allenlily5200/p/7096711.html)

    JS 只有一个线程，称之为主线程。而事件循环是主线程中执行栈里的代码执行完毕之后，才开始执行的。所以，主线程中要执行的代码时间过长，会阻塞事件循环的执行，也就会阻塞异步操作的执行。
    只有当主线程中执行栈为空的时候（即同步代码执行完后），才会进行事件循环来观察要执行的事件回调，当事件循环检测到任务队列中有事件就取出相关回调放入执行栈中由主线程执行
>我们用常见的写一个定时器来分析这个问题

```js
//定时器
function timer(period){
    for(var i=0;i<period;i++)
    {
        setTimeout(function(){
            return (function(n){
                console.log(n);
            })(i);
        },1000);
    }
}
timer(5);
// 结果并不会是我们期待的1,2,3,4,而是在一秒钟后输出5个5，调试后发现for循环很快设置了5个定时器，他们统
// 一会在1s后执行，设置完定时器后，当前所在事件也就是这个函数结束了，这个时候开始执行setTimeout定时器
// 内部的函数，因为i已经是5了，所以所有的定时器里都变成了5，并一起输出了出来，所以想正经写一个定时器还是
// 要用下递归
var t;
function timer(time){
    console.log(time);
    if(time==50)
    {
        return clearTimeout(t);
    }
    t=setTimeout(()=>timer(time+1),1000);
}
timer(1);
// 这个思路就是每个函数都会定义一个定时器，函数结束的时候正好运行
// setTimeout函数，也就是正好开启下一个函数，这样就实现了定时器雏形
//以下是对es 6 相对失败的思考orz
function timer(){
    var i=0;
    var p=new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log("计时开始");
            resolve(i+1);
        },1000);
    });
    while(i<50)
    {
        p.then((val) =>{
            console.log(val);
        });
    }
    return;
}
timer();
// 这段代码就很玄妙了，因为setTimeout函数会放在事件队列里，等当前函数执行完了才会设定，所以会进入死循环。。
setTimeout(function(){console.log(4)},0);
new Promise(function(resolve){
    console.log(1)
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 && resolve()
    }
    console.log(2)
}).then(function(){
    console.log(5)
});
console.log(3);
// 看到知乎上经典的问题，答案是1，2，3，5，4.
// 又分析了去掉while的代码，差不多得出了一个有关setTimeout和Promise的规律
// setTimeout是本轮事件结束下轮事件开始时运行，promise是本轮事件结束时运行，也就是说就算是
// then也是在setTimeout之前的
```

------------

### 原型与原型链

#### 作用域链的理解

------------

### 面向对象与继承

注：面向对象是一项非常有用的模式，js在初生时并没有考虑太多这方面的问题，后来无数js大牛创造出了这种模式，感
觉js创建对象的方法也有很多，工厂模式，原型模式，构造函数模式等等。。。。各大教科书高程什么的讲得很全，
个人筛选出了可能比较好的两种模式，毕竟没法记住所有的方法。。

#### 创建对象

>法一：组合使用构造函数模式和原型模式

```js
function Person(name,sex,height){
    this.name = name;
    this.sex = sex;
    this.height = height;
    this.friend = ["liao","liaoliao"];
}
Person.prototype = {
    construtor :Person,
    say : function(){
        console.log("i'm "+this.name);
    }
}
// 个人的想法是，构造函数中定义好这个对象所含有的变量，而原型方面定义好这个对象的函数，从而实现了“属性”和
// “功能”的分离，创建多个对象时也不会影响这里的friends数组，不是引用而是创建
```

>法二：稳妥构造函数（不是寄生式构造，寄生式构造不能用instanceof确定对象类型，不建议使用寄生式构造)

```js
function Person(name,sex,height){
    var o=new Object();
    var name = name;
    var sex = sex;
    var height = height;
    var friend = ["liao","liaoliao"];
    o.say = function(){
        console.log("i'm "+name);
    }
    return o;
}

// 这种构造方式最大的特点就是安全，封装性很好，不可以改变定义好对象的内部变量，但要注意三点（在某博客上
// 看到的）

// 注意： （以下3点）
// 1. 在稳妥构造函数中变量不能挂到要返回的对象o中
// 2. 在稳妥构造函数中的自定义函数操作元素时使用不要用this

// 3. 在函数外部使用稳妥构造函数时不用new。
```

>完整的带继承的测试代码

```js
function Person(name,sex,height){
    this.name = name;
    this.sex = sex;
    this.height = height;
    this.friend = ["liao","liaoliao"];
}
Person.prototype = {
    construtor :Person,
    say : function(){
        console.log("i'm "+this.name);
    }
}
//寄生式构造
// function Person(name,sex,height){
//     var o = new Object();
//     o.name = name;
//     o.sex = sex;
//     o.height = height;
//     o.friend = ["liao","liaoliao"];
//     o.say = function(){
//         console.log("i'm "+this.name);
//     }
//     return o;
// }
//稳妥构造
// function Person(name,sex,height){
//     var o=new Object();
//     var name = name;
//     var sex = sex;
//     var height = height;
//     var friend = ["liao","liaoliao"];
//     o.say = function(){
//         console.log("i'm "+name);
//     }
//     return o;
// }
// var person1 = Person("liao","boy",150);
// person1.say();
// console.log(person1.friend);
// person1.name="gg";
// person1.say();
function Superman(){
    var superman = new Person();
    superman.name = "wyp";
    superman.fly = function(){
        superman.say.call(this);
        console.log(this.name+" is flying");
    };
    return superman;
}
var person1=new Person("yao","公",150);
var person2=new Person("ji","母",160);
person1.say(); //i'm yao
console.log(person1.friend); //['liao','liaoliao']
person1.friend.push("bulaili");
console.log(person1.friend); //['liao','liaoliao','bulaili']
console.log(person2.friend); //['liao','liaoliao']
person2.say(); //i'm ji
person1.name="2333";
person1.say(); //i'm 2333
var wyp=new Superman();
wyp.fly(); //i'm wyp \n wyp is flying
wyp.name = "daer";
wyp.fly(); //i'm daer \n daer is flying
// 上述用的是寄生式继承，个人觉得传统的原型链+组合函数-》组合继承，比较散化封装性不太好，写多了容
// 易逻辑混乱

// 然后看了看寄生式继承与寄生式组合继承，两者非常像：思路都是创建对象->增强对象->返回对象，于是没有就着高
// 程上所写的把构造函数借用和原型链操作分开，而是做了个封装觉得这样的风格最好吧～，虽然只是个寄生式
// 继承orz
```

#### 继承

> 感觉必须要知道的组合继承

```js
function Person(name,height){
    this.name = name;
    this.height = height;
    this.friends=["liao1","liao2"];
}
Person.prototype.say = function () {
    console.log("I'm "+this.name);
}
function child(name,height,sex){
    Person.apply(this);
    this.name=name;
    this.height = height;
    this.sex = sex;
}
child.prototype = new Person();
var hh=new child("liao",150,"boy");
hh.say();
console.log(hh.friends);

```

#### 对象的深浅拷贝

>前提

在讨论深浅拷贝问题，先思考一下这个问题的实际出现场景，我们这里用到了最简单的变量，函数，和没有函数的字面量对象三种情况：

```js
var a = 3;
var b = a;
b = 4;
console.log(b);
console.log(a);
var c = function(){
    console.log("hey jude");
}
var d = c;
d = function() {
    console.log("Brelly liaoliao");
}
c();
d();
var obj1 = {
    name:"liaoliao",
    height:150
};
var obj2 = obj1;
obj2.name = "俊";
console.log(obj1.name);
console.log(obj2.name);//这里我们的obj2的改动影响的obj1的改动
```

所以得出出现深浅拷贝问题的情形在于对象，对象赋值或者说对象引用后改动的影响

>浅拷贝概念

    像前提中出现的我们定义一个对象，并直接赋值给一个变量的时候，我们改变这个变量也会改变愿对象，这是因为变量其实没有重新开辟一片空间去保存一个对象的副本，而只是一个单纯的指向原对象的一个引用，所以我们改变变量的时候当然也会改变原有的对象
>深拷贝概念

    这样看来深拷贝就好理解了，重新开辟一个空间，用来做原对象的副本，改变这个副本并不会影响原来的对象

>深拷贝方法

先给出这样的场景：

```js
var object1 = {
    apple: 0,
    banana: {
        weight: 52,
        price: 100
    },
    cherry: 97
};
var object2 = {
    banana: {
        price: 200
    },
    durian: 100
};
var object3 = {
    name:"俊",
    say:function(){
        console.log("我是"+this.name);
    }
};
```

__方法1:__ json转换（因为底层是二进制）

这个就是会吧原来的数据转化为字符串，这是针对对象的所有引用关系就不复存在了，然后再转化回来就是
    一个全新的对象。不在出现新对象改动污染原始对象的问题了.

```js
var b = JSON.parse(JSON.stringify(object1));
b.apple = 2;
console.log(object1.apple); //0
console.log(b.apple); //2
```

缺点：对象里不能含有函数，也就是说只适于json支持的数据格式

```js
var b = JSON.parse(JSON.stringify(object3));
b.name = "liao";
object3.say();
b.say();
//这样的拷贝就成功。。。报了错， b.say() is not a function
```

__方法二:__ 手写个clone函数吧

```js
function isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
}
var clone = function(v) {
    var o = isArray(v) ? [] : {};
    for(var i in v) {
        o[i] = typeof(v[i]) === 'object' ? clone(v[i]) : v[i];
    }
    return o;
};
var a = object3;
var b = clone(object3);
b.name = "liao";
a.say();
b.say();
```

__探索:__ jQuery源码中的extend

感觉好难，自己模仿着写了一个不知道对不对

```js

//默认情况浅拷贝
//object1--->{"apple":0,"banana":{"price":200},"cherry":97,"durian":100}
//object2的banner覆盖了object1的banner，但是weight属性未被继承
//$.extend(object1, object2);

//深拷贝
//object1--->{"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"durian":100}
//object2的banner覆盖了object1的banner，但是weight属性也被继承了呦
// $.extend(true,object1, object2);

// console.log('object1--->'+JSON.stringify(object1));

//以下为jQuery的extend仿写版
function extend(deep, target, obj) {
    var first = arguments[0] || {};
    var i = 0;
    var src, copy, clone,name,copyIsArray;
    if (typeof deep == "boolean") {
        deep = deep;
        i = 1;
    }
    else
        deep = false;
    var canshu = [].slice.call(arguments, i);
    var len = canshu.length;
    if (!len)
        return;
    if (len == 1)
        return target;
    //canshu[0]=== target
    if (typeof (target) !== "object" && !isFunction(target))
        target = {};
    for (var i = 1; i < len; i++) {
        for (name in canshu[i]) {
            //根据被扩展对象的键获得目标对象相应值，并赋值给src
            src = target[name];
            //得到扩展对象的值
            copy = canshu[i][name];
            if (target === copy) {
                continue;
            }
            if (deep && copy && ((typeof copy === "object") || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                    //将copyIsArray重新设置为false，为下次遍历做准备
                    copyIsArray = false;
                    // 判断被扩展的对象中src是不是数组
                    clone = src && isArray(src) ? src : [];
                } else {
                    // 判断被扩展的对象中src是不是纯对象
                    clone = src && typeof (src) == "object" ? src : {};
                }
                target[name] = extend(deep, clone, copy);
                // 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值
            } else if (copy !== undefined) {
                target[name] = copy;
            }
        }
    }
    return target;
}
//console.log(extend(false,object1,object2));
//console.log(extend(true, object1, object2));
```

### ajax原生与jquery创建过程，如何缓存优化

## es6

### es6的新特性

### 箭头函数的理解

### 解构赋值

### promise专题

>race与all 小尝试

```js
// var p1=Promise.resolve(43);
// var p2=Promise.resolve("hello liao");
// var p3=Promise.reject("Oops");
// Promise.race([p1,p2,p3])
// .then( function(msg){
//     console.log(msg);
// });
// Promise.all( [p1,p2,p3])
// .catch( function(err){
//     console.log(err);
// });
// Promise.all( [p1,p2])
// .then( function(msg){
//     console.log(msg);
// })
function getY(x) {
    return new Promise(function(resolve,reject){
        setTimeout( function (){
            resolve(2*x+1);
        },1000);
    });
}
function foo(bar,baz){
    var x=bar*baz;
    return getY(x)
           .then( function(y){
               return [x,y];
           });
}

foo(10,20)
.then( function(msgs){
    var x=msgs[0];
    var y=msgs[1];
    console.log( x,y );
});
```

#### generator

#### 第六变量symbol

------------

## 代码风格与规范

### 代码风格

#### es6 风格（阮一峰 es6入门）

#### 对象关联风格代替原型链风格 （选自《你不知道的JS》)

>原型风格

```js
function Foo(who){
    this.me=who;
}
Foo.prototype.identyyify = function() {
    return "i'm "+this.me;
}
function Bar(who){
    Foo.call(this,who);
}
Bar.prototype=Object.create(Foo.prototype);
Bar.prototype.speak = function(){
    console.log("hello, "+this.identify()+".");
};
var b1=new Bar("b1");
var b2=new Bar("b2");
b1.speak();
b2.speak();
```

>对象关联风格

```js
Foo={
    init: function(who){
        this.me = who;
    },
    identify: function(){
        return "I am "+this.me;
    }
};
Bar = Object.create(Foo);
Bar.speak = function(){
    console.log("hello, "+this.identify()+".");
};
var b1=Object.create(Bar);
b1.init("b1");
var b2=Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();
```

#### jQuery链式风格

#### html与js逻辑分离的风格

#### 能用css完成的动画效果不用js完成

### 代码规范

以前真没讲究过代码规范这回事，注释一般会写，缩进什么的都是用的beautiful插件。。。每个公司团队都有自己的代码规范吧hhh，从现在起也培养下自己的代码规范？

------------

## 购物车

* JavaScript语言精粹