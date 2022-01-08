const { performance } = require('perf_hooks');

function swap(items, leftIndex, rightIndex){
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    let pivot   = items[Math.floor((right + left) / 2)],
        i       = left, 
        j       = right; 
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); 
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right); 
        if (left < index - 1) { 
            quickSort(items, left, index - 1);
        }
        if (index < right) { 
            quickSort(items, index, right);
        }
    }
    return items;
}

//let items = [5,3,7,9,2,6,1,11,0,-3];
let items = [1, 4, 2, 7, 6, 3, 8, 20, 9, 15, 12, 10, 30, 5, 27, 43, 17, 23, 35, 13, 0, -10]; 
console.log(items);
let start = performance.now();
let sortedArray = quickSort(items, 0, items.length - 1);
console.log(`This took ${performance.now() - start} milliseconds to run`);
console.log(sortedArray); 
start = performance.now();
sortedArray = quickSort(items, 2, items.length - 3);
console.log(`This took ${performance.now() - start} milliseconds to run`);
console.log(sortedArray); 
start = performance.now();
sortedArray = quickSort(items, 4, items.length - 5);
console.log(`This took ${performance.now() - start} milliseconds to run`);
console.log(sortedArray); 
start = performance.now();
sortedArray = quickSort(items, 6, items.length - 7);
console.log(`This took ${performance.now() - start} milliseconds to run`);
console.log(sortedArray); 
start = performance.now();
sortedArray = quickSort(items, 0, (items.length/2)-1);
console.log(`This took ${performance.now() - start} milliseconds to run`);
console.log(sortedArray); 
start = performance.now();
sortedArray = quickSort(items, (items.length/2)-1, (items.length/2));
console.log(`This took ${performance.now() - start} milliseconds to run`);
console.log(sortedArray); 