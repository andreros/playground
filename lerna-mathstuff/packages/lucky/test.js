const lucky = require('./index');

describe('lucky', () => {
  it('should determine if a number could be lucky', () => {
    expect(lucky(1)).toBe(true);
    expect(lucky(13)).toBe(false);
    expect(lucky(10 + 3)).toBe(false);
    expect(lucky(12)).toBe(true);
    expect(lucky(11)).toBe(true);
    expect(lucky(0)).toBe(true);
    expect(lucky(-0)).toBe(true);
    expect(lucky(-100000)).toBe(true);
    expect(lucky(13.00001)).toBe(true);
  });
});