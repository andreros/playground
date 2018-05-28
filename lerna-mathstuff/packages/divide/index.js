const divide = (a, b) => {
  if (b === 0) {
    throw new RangeError("Cannot divide by zero.");
  }
  return a / b;
};

module.exports = divide;
