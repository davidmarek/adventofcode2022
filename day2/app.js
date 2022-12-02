const fs = require('fs');

function solve1() {
  const scores = {
    'A': { 'X': 1 + 3, 'Y': 2 + 6, 'Z': 3 + 0 },
    'B': { 'X': 1 + 0, 'Y': 2 + 3, 'Z': 3 + 6 },
    'C': { 'X': 1 + 6, 'Y': 2 + 0, 'Z': 3 + 3 }
  }
  return fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.split(' '))
    .reduce(
      (score, splitLine) => score + scores[splitLine[0]][splitLine[1]],
      0);
}

function solve2() {
  const scores = {
    'A': { 'X': 1 + 3, 'Y': 2 + 6, 'Z': 3 + 0 },
    'B': { 'X': 1 + 0, 'Y': 2 + 3, 'Z': 3 + 6 },
    'C': { 'X': 1 + 6, 'Y': 2 + 0, 'Z': 3 + 3 }
  }
  const translation = {
    'A': { 'X': 'Z', 'Y': 'X', 'Z': 'Y' },
    'B': { 'X': 'X', 'Y': 'Y', 'Z': 'Z' },
    'C': { 'X': 'Y', 'Y': 'Z', 'Z': 'X' }
  }
  return fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.split(' '))
    .map(([a, b]) => [a, translation[a][b]])
    .reduce(
      (score, splitLine) => score + scores[splitLine[0]][splitLine[1]],
      0);
}

console.log(solve1());
console.log(solve2());