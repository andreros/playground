import multiply from "@mathstuff/multiply";
import divide from "@mathstuff/divide";

// Find a^power
const exponentiate = (a, power) => {
  let result = 1;

  if (power > 0) {
    result = a;
    for (let i = 1; i < power; i++) {
      result = multiply(result, a);
    }
    return result;
  } else if (power < 0) {
    for (let i = power; i < 0; i++) {
      result = divide(result, a);
    }
  }
  return result;
};

module.exports = exponentiate;
