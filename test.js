function person(name,sex,score){
    this.name = name;
    this.sex = sex;
    this.score = score;
}
person.prototype.constructor={
    say:function(){
        console.log("My name is " + this.name + "score:" + this.score);
    }
};
function getExscore(name){
    var scorearr = {"熊大":100,"熊二":200};
    return scorearr[name];
}
var xiongda = new person("熊大","公",200);
var xionger = new person("熊二","公",100);
xiongda.getExscore(xiongda.name);
xionger.getExscore(xionger.name);
xiongda.say();
xionger.say();
