function f(a, b){
    if(arguments.length===2){
        return a+b;
    }else{
        let args = arguments;
        return function(){
            return args[0] + arguments[0];
        }
    }
}
console.log(f(1)(2));
console.log(f(1,2));