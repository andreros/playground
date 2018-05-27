const divide = (a, b) => {
  if (b === 0) {
    throw new RangeError("Cannot divide by 0.");
  }
  return a / b;
};

module.exports = divide;
