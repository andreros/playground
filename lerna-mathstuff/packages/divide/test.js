const divide = require('./index');

describe('divide', () => {
  it('should divide the first number by the second one', () => {
    expect(divide(10, 2)).toBe(5);
    
  });
});