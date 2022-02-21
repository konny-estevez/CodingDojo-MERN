var happy = { hi: function sign(n, result) {
    result = typeof result !== 'undefined' ? result : [];
    if (n == 0) {
        result.push("No more bottles");
        return result;
    }
    var str = n + " bottles";
    result.push(str);
    return sign(n-1,result);
    }   
}

console.log(happy.hi(3));