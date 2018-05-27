import add from "@demo/add";
import divide from "@demo/divide";

// Find the average of an array of numbers;
const average = arr => {
  const arrSum = arr.reduce((acc, b) => add(acc, b), 0);
  return divide(arrSum, arr.length);
};

module.exports =  average;
