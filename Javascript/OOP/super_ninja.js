class Ninja {
    constructor(nombre, salud, velocidad = 3, fuerza = 3) {
        this.nombre = nombre;
        this.salud = salud;
        this.velocidad = velocidad;
        this.fuerza = fuerza;
    }

    sayName() {
        console.log(`Nombre: ${this.nombre}`);
    }

    showStats() {
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Salud: ${this.salud}`);
        console.log(`Fuerza: ${this.fuerza}`);
        console.log(`Velocidad: ${this.velocidad}`);
    }

    drinkSake() {
        if (this.salud === undefined)
            this.salud = 10;
        else
            this.salud += 10;
    }
}

class Sensei extends Ninja {
    constructor(nombre, salud = 200, velocidad = 10, fuerza = 10, sabiduria = 10) {
        super(nombre, salud, velocidad, fuerza);
        this.sabiduria = sabiduria;
    }

    speakWisdom() {
        this.drinkSake();
        console.log("Lo que un programador puede hacer en un mes, dos programadores pueden hacerlo en dos meses.");
    }
}

const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.drinkSake();
ninja1.showStats();
ninja1.drinkSake();
ninja1.showStats();

// ejemplo de salida
const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
// -> "Lo que un programador puede hacer en un mes, dos programadores pueden hacerlo en dos meses."
superSensei.showStats();
// -> "Nombre: Master Splinter, Salud: 210, Velocidad: 10, Fuerza: 10"