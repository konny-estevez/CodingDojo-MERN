const factorial = (number) =>{
    let result = 1;
    for (let index = 1; index <= number; index++) {
        result *= index;
    }
    return result;
}

const factorial2 = (number) =>{
    let array = Array.from(Array(number+1).keys());
    return array.reduce((prev, next)=> prev === 0 ? 1 : prev * next) ;
}

// console.log(factorial2(5));

module.exports.factorial = factorial;