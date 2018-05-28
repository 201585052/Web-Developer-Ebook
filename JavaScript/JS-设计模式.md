# JavaScript 设计模式

__前言__:看起来设计模式是很难的，但有一部分都是自己平时书写的方式，多看设计模式，有利于更稳更快地写代码

> 构造器模式

```js
var foo=(function module(id){
    var name="liao";
    var sex;
    var id=id;
    function getname(){
        return name;
    }
    function setname(name){
        this.name=name;
    }
    return {
        name:name,
        setname:setname
    }
})(123);
foo.setname("liaoliao");
console.log(foo.name);
console.log(foo.id);
/*这里就是在函数内部定义的为私有变量不可访问或修
改，而通过return暴露出来的才是可以调用的公用方法和变量*/
```

> AMD与CMD