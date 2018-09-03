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
child.prototype = Object.create(new Person());
var hh=new child("liao",150,"boy");
hh.say();
console.log(hh.friends);