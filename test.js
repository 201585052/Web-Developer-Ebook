function run(fn){
    var gen = fn();

    function next(err,data){
        var res = gen.next(data);
        if(res.done) return;
        res.value(next);
    }
}