// add.spec.js
const { factorial } = require('./factorial');

describe('factorial', () => {
    test('correctly returns the factorial of a number', () => {
        expect(factorial(2)).toBe(2);
        expect(factorial(3)).toBe(6);
        expect(factorial(4)).toBe(24);
    });
});
