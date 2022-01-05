const faker = require('faker');

class Company {
    constructor() {
        this.id = faker.datatype.uuid();
        this.name = faker.company.companyName();
        this.address = {
            street : faker.address.streetAddress(),
            city : faker.address.city(),
            state: faker.address.state(),
            postalCode : faker.address.zipCode(),
            country : faker.address.country(),
        };
    }
}

module.exports.createCompany = () => {
    return new Company();
}