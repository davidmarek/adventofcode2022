const _ = require('lodash');
const fs = require('fs');

const readData = () => fs.readFileSync('input.txt', 'utf8').split('\n');
const parseLine = (line) => line.split(',').map(interval => interval.split('-').map(x => parseInt(x)));
const isInside = ([[al, ar], [bl, br]]) => (al >= bl && ar <= br) || (al <= bl && ar >= br);
const solve1 = () => _.chain(readData()).map(parseLine).filter(isInside).value().length;
const overlapPartially = ([[al, ar], [bl, br]]) => ar >= bl && br >= al;
const solve2 = () => _.chain(readData()).map(parseLine).filter(overlapPartially).value().length;

console.log(solve1());
console.log(solve2());