Number.prototype.isPrime = function() {
    for (let i = 2; i < this; i++) {
        if (this % i === 0) {
            return false;
        }
    }
    return true;
}

Number.prototype.isPrime2 = function() {
    for (let i = 2; i < this; i++) {
        let sqrt = Math.sqrt(i);
        if (this < sqrt && sqrt < (this + 1)) {
            return true;
        }
    }
    return false;
}

const { performance } = require('perf_hooks');
let start = performance.now();
let primeCount = 0;
let num = 2; // por razones matemáticas, 1 se considera primo
// while (primeCount < 1e4) {
//     if (num.isPrime2()) {
//         primeCount++;
//     }
//     num++;
// }
console.log(`The 10,000th prime number is ${num-1}`);
console.log(`This took ${performance.now() - start} milliseconds to run`);
// The 10,000th prime number is 104729
// This took 90923.81939999945 milliseconds to run

// recursive
console.log();
start = performance.now();

function rFib(n) {
    if (n < 2) {
        return n;
    }
    return rFib(n - 1) + rFib(n - 2);
}
rFib(20);
console.log(`The Fiboacci recursivo de 20`);
console.log(`This took ${performance.now() - start} milliseconds to run`);
// The Fiboacci recursivo de 20
// This took 1.5940000005066395 milliseconds to run

// iterative
start = performance.now();

function iFib(n) {
    const vals = [0, 1];
    while (vals.length - 1 < n) {
        let len = vals.length;
        vals.push(vals[len - 1] + vals[len - 2]);
    }
    return vals[n];
}
iFib(20);
console.log(`The Fiboacci iterativo de 20`);
console.log(`This took ${performance.now() - start} milliseconds to run`);
// The Fiboacci iterativo de 20
// This took 0.07519999984651804 milliseconds to run

console.log();
const story = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident culpa nihil repellat nulla laboriosam maxime, quia aliquam ipsam reprehenderit delectus reiciendis molestias assumenda aut fugit tempore laudantium tempora aspernatur? Repellendus consequatur expedita doloribus soluta cupiditate quae fugit! Aliquid, repellat animi, illum molestias maiores, laboriosam vero impedit iusto mollitia optio labore asperiores!";
start = performance.now();
const reversed1 = story.split("").reverse().join("");
console.log(`Tiempo de inversion de cadena`);
console.log(`This took ${performance.now() - start} milliseconds to run`);
// Tiempo de inversion de cadena
// This took 0.08990000002086163 milliseconds to run

start = performance.now();
const reversed2 = [];
for (let index = story.length - 1; index >= 0; index--) {
    reversed2.push(story[index]);
}
const reversed = reversed2.join("");
console.log(`Tiempo de inversion de cadena`);
console.log(`This took ${performance.now() - start} milliseconds to run`);
// Tiempo de inversion de cadena
// This took 0.0752999996766448 milliseconds to run