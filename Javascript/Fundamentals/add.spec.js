// add.spec.js
const { add } = require('./funcs');
 
describe('add', () => {
    test('correctly returns the sum of two numbers', () => {
        expect(add(2, 2)).toBe(4);
        expect(add(4, 6)).toBe(10); 
    });
});