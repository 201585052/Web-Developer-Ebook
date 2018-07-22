# jQuery 系列

__前言：__
使用jQuery的话出于5点考虑：

* 1、简洁的API 

* 2、优雅的链式 

* 3、强大的选择器 

* 4、便捷的操作 

* 5、兼容性的保证

代码重点部分有整体,sizzle引擎，事件系统，Dom操作和Ajax等。

而新时代我对jQuery的理解:jQuery的出现当初就是为了操作DOM比较方便，而React基本不会对原生的DOM进行操作，所以jQuery的源码部分更多是作为教科书来用的，毕竟在React实际开发之中肯定会有类似函数的封装。

ps:连jQuery的作者都去研究React了orz

-----------
## jQuery原理层面

### jQuery源码总体思路

> 过去

[切图仔前辈的总体分析](http://www.cnblogs.com/coco1s/p/5261646.html)

以下是个人理解：

jQuery的写法其实就是一个大的构造器模式(function(window,undefined){})(window).

先定义了各种基础变量函数，然后定义jQuery.fn=jQuery.prototype={

    1、init,参数(selector,context,rootjQuery),jQuery.fn.init.prototype = jQuery.fn;通过push_back函数，prevobj保存住当前对象，返回实现链式调用
    2、各种each,slice,ready函数的定义
    3、extend函数定义
    4、通过extend函数拓展各种功能
    5、sizzle选择器部分是独立的，我觉得应该要精通正则表达式才可以看吧。。。
    6、用钩子函数完成兼容性的代码修正
}

> 现在

jQuery的总体设计是AMD模块规范（require.js)，把独立的功能独立成小模块实现，这样更有利于以后对具体某项功能或者兼容性的实现,比如typeof,extend,ajax,大体上是这样的开头

```js
define( [
	"./core",
	"./data/var/dataPriv",
	"./deferred",
	"./callbacks"
], function( jQuery, dataPriv ) {
```

觉得是先看了1.10.2的大块分析，分模块才会更清晰有条理orz

### jQuery.fn中的重点方法

> init:jQuery对象构造器。

参数(selector,context,rootjQuery),通过Sizzle引擎在rootjQuery里查找selector，通过调用makeArray返回一个类数组对象。

> on()、bind()、delegate()、live()、:

只是调用on而已，如此看来的话delegate和on的参数是完全一样的而且还是调用的on。。。。

源码：

```js
bind: function(types, data, fn) {
    return this.on(types, null, data, fn);
},
unbind: function(types, fn) {
    return this.off(types, null, fn);
},

// 同样调用的 this.on/this.off
// 所有匹配选择器（selector参数）的元素绑定一个或多个事件处理函数，基于一个指定的根元素的子集，
// 匹配的元素包括那些目前已经匹配到的元素，也包括那些今后可能匹配到的元素
//selector参数注意需要是当前选择元素的子元素
delegate: function(selector, types, data, fn) {
    return this.on(types, selector, data, fn);
},
undelegate: function(selector, types, fn) {
    // ( namespace ) or ( selector, types [, fn] )
    return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
}
```
live 在1.7版本以后已被禁用。。。怪不得源码里没看到。。

> jQuery.callbacks.fire()

[api]

### jQuery自定义事件

解释的话，其实就是trigger事件，设计一个属于自己的触发事件,也可以在用户不操作的情况下直接模拟用户操作。
[了解trigger与triggerhandler](https://www.cnblogs.com/jiajia-16/p/6158577.html)
源码分析：

> 模拟用户操作部分：

```js
//这一部分就是类似$('#elem').trigger('click');之后的真实情况
special: {
    load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
    },
    focus: {
        // Fire native event if possible so blur/focus sequence is correct
        trigger: function() {
            if (this !== safeActiveElement() && this.focus) {
                try {
                    this.focus();
                    return false;
                } catch (e) {
                    // Support: IE<9
                    // If we error on focus to hidden element (#1486, #12518),
                    // let .trigger() run the handlers
                }
            }
        },
        delegateType: "focusin"
    },
    blur: {
        trigger: function() {
            if (this === safeActiveElement() && this.blur) {
                this.blur();
                return false;
            }
        },
        delegateType: "focusout"
    },
    click: {
        // For checkbox, fire native event so checked state will be right
        trigger: function() {
            if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                this.click();
                return false;
            }
        },

        // For cross-browser consistency, don't fire native .click() on links
        _default: function(event) {
            return jQuery.nodeName(event.target, "a");
        }
    },

    beforeunload: {
        postDispatch: function(event) {

            // Even when returnValue equals to undefined Firefox will still show alert
            if (event.result !== undefined) {
                event.originalEvent.returnValue = event.result;
            }
        }
    }
},
```

如果发现并非是这几种事件那么就会执行原先自定义的trigger事件中、也就是这一部分

```js
//老实讲，这个代码也不是那么懂，先晾着，看看回头结合材料能不能看懂orz
trigger: function(event, data, elem, onlyHandlers) {
    var handle, ontype, cur,
        bubbleType, special, tmp, i,
        eventPath = [elem || document],
        // core_hasOwn = [].hasOwnProperty
        type = core_hasOwn.call(event, "type") ? event.type : event,
        namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

    cur = tmp = elem = elem || document;

    // Don't do events on text and comment nodes
    // nodeType = 3 -- Text
    // nodeType = 8 -- Comment
    if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
    }

    // focus/blur morphs to focusin/out; ensure we're not firing them right now
    // focus/blur 将变形为 focusin/focusout 另行处理
    if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
    }

    // 对具有命名空间事件的处理
    if (type.indexOf(".") >= 0) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
    }

    //
    ontype = type.indexOf(":") < 0 && "on" + type;

    // Caller can pass in a jQuery.Event object, Object, or just an event type string
    //
    event = event[jQuery.expando] ?
        event :
        new jQuery.Event(type, typeof event === "object" && event);

    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join(".");
    event.namespace_re = event.namespace ?
        new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
        null;

    // Clean up the event in case it is being reused
    event.result = undefined;
    if (!event.target) {
        event.target = elem;
    }

    // Clone any incoming data and prepend the event, creating the handler arg list
    data = data == null ?
        [event] :
        jQuery.makeArray(data, [event]);

    // Allow special events to draw outside the lines
    special = jQuery.event.special[type] || {};
    if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
    }

    // Determine event propagation path in advance, per W3C events spec (#9951)
    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
        }

        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
    }

    // Fire handlers on the event path
    // 取handle
    // 执行
    // 执行通过onXXX方式添加的事件（如onclick="fun()"）
    // 取父元素
    // while循环不断重复这四步以模拟事件冒泡。直到window对象
    i = 0;
    while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

        event.type = i > 1 ?
            bubbleType :
            special.bindType || type;

        // jQuery handler
        handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
        if (handle) {
            handle.apply(cur, data);
        }

        // Native handler
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
            event.preventDefault();
        }
    }
    event.type = type;

    // If nobody prevented the default action, do it now
    // 这一段是对于浏览器默认行为的触发
    if (!onlyHandlers && !event.isDefaultPrevented()) {

        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
            jQuery.acceptData(elem)) {

            // Call a native DOM method on the target with the same name name as the event.
            // Can't use an .isFunction() check here because IE6/7 fails that test.
            // Don't do default actions on window, that's where global variables be (#6170)
            if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                // Don't re-trigger an onFOO event when we call its FOO() method
                tmp = elem[ontype];

                if (tmp) {
                    elem[ontype] = null;
                }

                // Prevent re-triggering of the same event, since we already bubbled it above
                jQuery.event.triggered = type;
                try {
                    elem[type]();
                } catch (e) {
                    // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                    // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                }
                jQuery.event.triggered = undefined;

                if (tmp) {
                    elem[ontype] = tmp;
                }
            }
        }
    }

    return event.result;
}
```

### jQuery队列如何实现，及用在啥地方。

> 含义：给一个jQuery对象上绑定的一系列函数事件的队列

方法：jQuery._data(elem, type);取出这个元素该有的系列事件放到queue数组里返回，中间有很多的细节处理，包括怎样返回一个类对象数组如makearray等。
[手册](http://www.w3school.com.cn/jquery/data_queue.asp)

### jQuery通过哪个方法与sizzle选择器结合？（jQuery.fn.find())

### extend源码

```js

// 扩展合并函数
// 合并两个或更多对象的属性到第一个对象中，jQuery 后续的大部分功能都通过该函数扩展
// 虽然实现方式一样，但是要注意区分用法的不一样，那么为什么两个方法指向同一个函数实现，但是却实现不同的功能呢,
// 阅读源码就能发现这归功于 this 的强大力量
// 如果传入两个或多个对象，所有对象的属性会被添加到第一个对象 target
// 如果只传入一个对象，则将对象的属性添加到 jQuery 对象中，也就是添加静态方法
// 用这种方式，我们可以为 jQuery 命名空间增加新的方法，可以用于编写 jQuery 插件
// 如果不想改变传入的对象，可以传入一个空对象：$.extend({}, object1, object2);
// 默认合并操作是不迭代的，即便 target 的某个属性是对象或属性，也会被完全覆盖而不是合并
// 如果第一个参数是 true，则是深拷贝
// 从 object 原型继承的属性会被拷贝，值为 undefined 的属性不会被拷贝
// 因为性能原因，JavaScript 自带类型的属性不会合并
jQuery.extend = jQuery.fn.extend = function () {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    // target 是传入的第一个参数
    // 如果第一个参数是布尔类型，则表示是否要深递归，
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        // 如果传了类型为 boolean 的第一个参数，i 则从 2 开始
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    // 如果传入的第一个参数是 字符串或者其他
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    // 如果参数的长度为 1 ，表示是 jQuery 静态方法
    if (length === i) {
        target = this;
        --i;
    }

    // 可以传入多个复制源
    // i 是从 1或2 开始的
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        // 将每个源的属性全部复制到 target 上
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                // src 是源（即本身）的值
                // copy 是即将要复制过去的值
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                // 防止有环，例如 extend(true, target, {'target':target});
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                // 这里是递归调用，最终都会到下面的 else if 分支
                // jQuery.isPlainObject 用于测试是否为纯粹的对象
                // 纯粹的对象指的是 通过 "{}" 或者 "new Object" 创建的
                // 如果是深复制
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    // 数组
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                        // 对象
                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    // 递归
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                    // 最终都会到这条分支
                    // 简单的值覆盖
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    // 返回新的 target
    // 如果 i < length ，是直接返回没经过处理的 target，也就是 arguments[0]
    // 也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 jQuery 的静态方法
    return target;
};
```

### jQuery 实现ajax

巨难，竟然还包括对header中content-type 和E-tag头的分析，简直了。。。

---

## jQuery应用层面

### jQuery4种选择器

```js
(1)基本
#id
element
.class
*
selector1,selector2,selectorN
(2)层次选择器：
ancestor descendant
parent > child
prev + next
prev ~ siblings
(3)基本过滤器选择器
:first
:last
:not
:even
:odd
:eq
:gt
:lt
:header
:animated
(4)内容过滤器选择器
:contains
:empty
:has
:parent
(5)可见性过滤器选择器
:hidden
:visible
(6)属性过滤器选择器
[attribute]
[attribute=value]
[attribute!=value]
[attribute^=value]
[attribute$=value]
[attribute*=value]
[attrSel1][attrSel2][attrSelN]
(7)子元素过滤器选择器
:nth-child
:first-child
:last-child
:only-child
(8)表单选择器
:input
:text
:password
:radio
:checkbox
:submit
:image
:reset
:button
:file
:hidden
(9)表单过滤器选择器
:enabled
:disabled
:checked
:selected
简单说就是锋利的jQuery上的基本、层次、过滤、表单
```

### jQuery，多个事件同函数，多个事件不同函数

```js
$('div').on('click mouseover',function(){});
$('div').on({
    click:function(){},
    mouseover:function(){}
});
```

### bind与on的区别

[参考](https://blog.csdn.net/aitangyong/article/details/43673535)

### animate动画小试

> jQuery的一系列特效和API可以参考[官网](https://www.jquery123.com/)

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/core.js"></script>
</head>
<style>
    #test{
        background-color: cadetblue;
        width: 200px;
        height:100px;
        margin:50px;
        position: absolute;
    }
</style>
<body>
    <div id="test">

    </div>
    <button class="ctrl" type = "submit" >向右变化</button>
    <button class="ctrl2" type = "submit" >向左变化</button>
    <script>
        $('.ctrl').click(function(){
            $('#test').animate({
                // height:300,
                opacity:0.5,
                left: "+=250px",
                width: ["toggle" ],
                height: "toggle"
            },2000,function(){
                console.log("运动完成")
            })
        });
        $('.ctrl2').click(function(){
            $('#test').animate({
                width: ["toggle" ],
                height: "toggle",
                left:"-=250px"
            });
        });
    </script>
</body>
</html>
```

### jQuery 自制插件

> jQuery插件封装对象

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
    <input type="button" id="send" value="Ajax获取" />
    <div class="comment">已有评论</div>
    <div id="resTest"></div>
    <script>
        ;(function($){
            $.fn.extend({
                "color":function(value){
                    if(value!=undefined)
                        return this.css("color",value);
                    else
                        return this.css('color');
                }
            });
        })(jQuery);
        $('#send').click(function(){
            $('.comment').color("red");
        })
        $(function(){
            alert($('.comment').color());
        })
    </script>
</body>
</html>
```

> jQuery封装全局函数

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
    <input type="button" id="send" value="Ajax获取" />
    <div class="comment">已有评论</div>
    <div id="resTest"></div>
    <textarea name="hh" id="trimtest" cols="30" rows="10"></textarea>
    <script>
        ;(function($){
            $.extend({
                ltrim : function(txt) {
                    return (txt || "").replace(/^\s+/g,"");
                },
                rtrim : function(txt) {
                    return (txt || "").replace(/\s+$/g,"");
                }
            })
        })(jQuery);
        $(function(){
            $("#trimtest").val(
                jQuery.ltrim("     test     ")+"\n"+
                jQuery.rtrim("     test     ")
            );
        });
    </script>
</body>
</html>
```

>jQuery自制选择器插件

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
</head>

<body>
    <div>
        <i>0</i>
        <i>1</i>
        <i>2</i>
        <i>3</i>
        <i>4</i>
        <i>5</i>
    </div>
    <button id="btn">测试</button>
    <script>
        ;
        (function ($) {
            var $index = -1;
            $.extend($.expr[":"], {
                between: function (a, i, m) {
                    var temp = m[3].split(",");
                    $index++;
                    return +temp[0] < $index && $index < +temp[1];
                }
            });
        })(jQuery);
        $('#btn').click(function () {
            $('i:between(1,5)').css('background', 'lightblue');
        });
    </script>
</body>

</html>
```

### jQuery常见场景需求

>jQuery建表（与React虚拟DOM做对比的，模拟DOM修改时的变化）

````HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="container"></div>
    <button id="btn-change">clik liao</button>
    <script>
        var data = [
            {
                name:'张三',
                age:'20',
                address:'北京'
            },
            {
                name:'李四',
                age:'21',
                address:'上海'
            },
            {
                name:'王五',
                age:'23',
                address:'广州'
            }
        ];
        function render(data){
            var $container = $('#container');
            //清空容器，不会追加
            $container.html('');
            var $table = $('<table>');
            $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'));
            data.forEach(function(item) {
                $table.append($('<tr><td>'+ item.name +'</td><td>'+ item.age +'</td><td>' + item.address + '</td></tr>'));
            });
            $container.append($table);
        }
        $('#btn-change').click(function() {
            data[1].age = 30;
            data[2].address = '深圳';
            //re-render
            render(data);
        });
        render(data);
    </script>
</body>
</html>
```


[参考](https://www.cnblogs.com/chuaWeb/p/jQuery-1-9-1-catalog.html)
[其他](http://www.imooc.com/learn/172)