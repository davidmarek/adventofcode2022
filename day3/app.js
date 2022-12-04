const fs = require('fs');
const _ = require('lodash');

const values = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const readFile = () => fs.readFileSync("input.txt", "utf8").split('\n');
const sum = (numbers) => _.reduce(numbers, (a, b) => a + b);
const splitLineIntoCompartments = (line) => [line.substring(0, line.length / 2), line.substring(line.length / 2, line.length)];
const getCommonLetters = (compartments) => _.intersection(compartments[0].split(""), compartments[1].split(""));
const getValue = (ch) => values.indexOf(ch);
const computeValue = (commonLetters) => _.chain(commonLetters).map(getValue).reduce((a, b) => a + b).value();

function solve1() {
  return _.chain(readFile())
    .map(splitLineIntoCompartments)
    .map(getCommonLetters)
    .map(computeValue)
    .reduce((a, b) => a + b)
    .value();
}

function solve2() {
  const values = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return readFile()
    .reduce(([groups, current], line, idx) => idx % 3 == 2 ? [[...groups, [...current, line]], []] : [groups, [...current, line]], [[], []])[0]
    .map(([a, b, c]) =>
      a.split("")
        .reduce((intersection, ch) => b.indexOf(ch) != -1 && c.indexOf(ch) != -1 ? intersection.add(ch) : intersection, new Set()))
    .reduce((overalls, s) => overalls + Array.from(s.values()).reduce((total, ch) => total + values.indexOf(ch), 0), 0);
}

console.log(solve1());
console.log(solve2());