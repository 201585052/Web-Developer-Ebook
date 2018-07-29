var a = 3;
var b = a;
b = 4;
console.log(b); //4
console.log(a); //3
var c = function(){
    console.log("hey jude");
}
var d = c;
d = function() {
    console.log("Brelly liaoliao");
}
c();//b
d();//b
var obj1 = {
    name:"liaoliao",
    height:150
};
var obj2 = obj1;
obj2.name = "俊";
console.log(obj1.name);//jun
console.log(obj2.name);//这里我们的obj2的改动影响的obj1的改动