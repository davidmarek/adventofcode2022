const _ = require('lodash');
const fs = require('fs');

const readInput = () => fs.readFileSync('input.txt', 'utf8');
const isSolution = (substring, count) => new Set(substring).size == count
const findSolution = (line, count) => _.takeWhile(line, (val, idx) => !isSolution(_.slice(line, idx, idx + count), count)).length + count;
const solve1 = () => findSolution(readInput(), 4);
const solve2 = () => findSolution(readInput(), 14);

console.log(solve1());
console.log(solve2());