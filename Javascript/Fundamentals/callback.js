console.log("Ejercicio 1");
console.log("NOW: ");
console.log("Declaring and assigning variable 'ninja'.");
const ninja = 'Libby';
setTimeout( function myCallbackFunction(){
  console.log("LATER: ")
  console.log(ninja, "LATER"); }, 2000
);
console.log("Printing ninja value.");
console.log(ninja, "NOW");

console.log("Ejercicio 2");
let a = 2;
const b = function() { console.log("something"); };
function doSomethingX(x) {
  console.log("tipo: " + typeof(x));
}
doSomethingX(a);
doSomethingX(b);

console.log("Ejercicio 3");
function makePasta(pasta, makeSauce) {
    console.log("Boiling water");
    console.log("Putting " + pasta + " pasta in the water");
    // crea una variable para sauce!
    const sauce = makeSauce();          // invoca makeSauce, nuestro callback
    console.log("Mixing sauce");
    console.log("Pasta is done!");
    return pasta + " Pasta with " + sauce + " sauce! Voila!";
  }
  function makePesto() {
    console.log("Making Pesto");
    return "pesto";
  }
  function makeAlfredo() {
    console.log("Making Alfredo");
    return "alfredo";
  }
  // ¡Pasamos toda la receta de makePesto para hacerPasta!
  console.log(makePasta("Penne", makePesto));
  // nota la falta de paréntesis después de makePesto.
  // Recuerda: queremos pasar la función, no ejecutarla y pasar un valor de retorno.
  console.log(makePasta("Farfalle", makeAlfredo));
  
  console.log("Ejercicio 4");
  function orderSupplies(item, callback) {
    let warehouse; //undefined
    const deliveryTime = Math.random() * 3000;
    setTimeout(() => {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: () => 'mix it!'
        },
        brush: {
          product: 'Horsehair brush',
          directions: () => 'start painting!'
        },
        lona: {
            product: 'Hairdip',
            directions: () => 'do it something!'
        }
      };
      callback(warehouse[item]);
    }, deliveryTime);
  }
  function receivedItem(item) {
    console.log(`Received ${item.product}, time to ${item.directions()}`);
  }
  orderSupplies('brush', receivedItem);
  orderSupplies('paint', receivedItem);
  orderSupplies('lona', receivedItem);
  