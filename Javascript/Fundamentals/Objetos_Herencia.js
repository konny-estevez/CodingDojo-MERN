class Vehicle {
    constructor(manufacturer, model, color, country) {
        this.miles = 0;
        this.manufacturer = manufacturer;
        this.model = model;
        this.color = color;
        this.country = country;
        //this.year = year;
    }

    drive() {
        this.miles += 10;
    }
}

class BMW extends Vehicle {
    constructor(model, color) {
        super("BMW", model, color, "Dinamarca");
        this.turbo = "doble";
    }
}

class M5 extends BMW {
    constructor(color) {
        super("M5", color);
        this.hp = 616;
    }
}

class X3 extends BMW {
    constructor(color) {
        super("X3", color);
        this.hp = 500;
    }
}

class X3_Sport extends X3 {
    constructor(color) {
        super(color);
        this.type = "Sport";
    }
}

class MercedesBenz extends Vehicle {
    constructor(model, color) {
        super("MercedesBenz", model, color, "Alemania");
    }
}

class Volvo extends Vehicle {
    constructor(model, color) {
        super("Volvo", model, color, "Suecia");
    }
}

const my_first_BMW = new X3_Sport("rojo");
console.log(my_first_BMW);
my_first_BMW.drive();
console.log();
console.log(my_first_BMW);