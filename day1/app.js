const fs = require('fs');

function solve1() {
  return Math.max(...fs.readFileSync('./input.txt', 'utf8')
    .split('\n')
    .reduce(([best, last], line) =>
      (line == '' ? [Math.max(best, last), 0] : [best, last + parseInt(line)]),
      [0, 0]));
}

function solve2() {
  return fs.readFileSync('./input.txt', 'utf8')
    .split('\n')
    .reduce(([arr, last], line) =>
      (line == '' ? [arr.concat(last), 0] : [arr, last + parseInt(line)]),
      [[], 0])
    .reduce((arr, x) => arr.concat([x]))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, x) => total + x);
}

console.log(solve1());
console.log(solve2());