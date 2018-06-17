# jQuery 系列

__前言：__
使用jQuery的话出于5点考虑：1、简洁的API 2、优雅的链式 3、强大的选择器 4、便捷的操作 5、兼容性的保证

-----------

## jQuery4种选择器

## bind与on的区别

## jQuery源码总体思路

## jQuery.fn中的重点方法（如init方法，bind(),live(),delegate(),on()，fire，的具体实现）

## jQuery中的重点操作（json转换）

## jQuery 实现ajax

## 实现extend源码功能

```js
//从某网站学的，忘了orz
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

## animate动画小试

>jQuery的一系列特效和API可以参考[官网](https://www.jquery123.com/)

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

## jQuery 自制插件

>jQuery插件封装对象

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

>jQuery封装全局函数

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

## jQuery常见场景需求

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