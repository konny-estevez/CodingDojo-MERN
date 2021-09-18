//  Ejercicio 1
console.log("Ejercicio 1");
console.log(hello);                                   
var hello = 'world';                                 
/*
var hello;
console.log(hello);                                   
hello = 'world';                                 
*/
/*  Resultado
undefined
*/

//  Ejercicio 2
console.log("Ejercicio 2");
var needle = 'haystack';
test();
function test(){
    var needle = 'magnet';
    console.log(needle);
}
/*
var needle = 'haystack';
function test(){
    var needle = 'magnet';
    console.log(needle);
}
test();
*/
/*  Resultado
magnet
*/

//  Ejercicio 3
console.log("Ejercicio 3");
var brendan = 'super cool';
function print(){
    brendan = 'only okay';
    console.log(brendan);
}
console.log(brendan);
/*
var brendan = 'super cool';
function print(){
    var brendan;
    console.log(brendan);
    brendan = 'only okay';
}
console.log(brendan);
*/
/*  Resultado
super cool
*/

//  Ejercicio 4
console.log("Ejercicio 4");
var food = 'chicken';
console.log(food);
eat();
function eat(){
    food = 'half-chicken';
    console.log(food);
    var food = 'gone';
}
/*
var food = 'chicken';
console.log(food);
function eat(){
    var food = 'half-chicken';
    console.log(food);
    food = 'gone';
}
eat();
*/
/*  Resultado
chicken
half-chicken
*/

//  Ejercicio 5
console.log("Ejercicio 5");
//mean();
console.log(food);
var mean = function() {
    food = "chicken";
    console.log(food);
    var food = "fish";
    console.log(food);
}
console.log(food);
/*
var food;
console.log(food);
var mean = function() {
    food = "chicken";
    console.log(food);
    var food = "fish";
    console.log(food);
}
mean();
console.log(food);
*/
/*  Resultado
Error debido a la function se asigna a una variable y se la llama antes de usar.
*/

//  Ejercicio 6
console.log("Ejercicio 6");
console.log(genre);
var genre = "disco";
rewind();
function rewind() {
    genre = "rock";
    console.log(genre);
    var genre = "r&b";
    console.log(genre);
}
console.log(genre);
/*
var genre;
console.log(genre);
genre = "disco";
function rewind() {
    var genre;
    genre = "rock";
    console.log(genre);
    genre = "r&b";
    console.log(genre);
}
rewind();
console.log(genre);
*/
/*  Resultado
undefined
rock
r&b
disco
*/

//  Ejercicio 7
console.log("Ejercicio 7");
dojo = "san jose";
console.log(dojo);
learn();
function learn() {
    dojo = "seattle";
    console.log(dojo);
    var dojo = "burbank";
    console.log(dojo);
}
console.log(dojo);
/*
var dojo = "san jose";
console.log(dojo);
function learn() {
    var dojo = "seattle";
    console.log(dojo);
    dojo = "burbank";
    console.log(dojo);
}
learn();
console.log(dojo);
*/
/*  Resultado
san jose
seattle
burbank
san jose
*/

//  Ejercicio 8
console.log("Ejercicio 8");
console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));
function makeDojo(name, students){
    const dojo = {};
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        //dojo = "closed for now";
    }
    return dojo;
}
/*
function makeDojo(name, students){
    const dojo = {};
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = "closed for now";
    }
    return dojo;
}
console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));
*/
/*  Resultado
Error en la linea, dojo = "closed for now";
No se puede modificar el valor de una constante
*/

//  Ejercicio 9
console.log("Ejercicio 9");
magicalUnicorns();
var magicalUnicorns = function(){
    console.log("Will it blend?");
}
console.log("Don't breathe this!");

