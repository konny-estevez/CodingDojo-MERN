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
        console.log(`Fuerza: ${this.fuerza}`);
        console.log(`Velocidad: ${this.velocidad}`);
        console.log(`Salud: ${this.salud}`);
    }

    drinkSake() {
        if (this.salud === undefined)
            this.salud = 10;
        else
            this.salud += 10;
    }
}

const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.drinkSake();
ninja1.showStats();
ninja1.drinkSake();
ninja1.showStats();