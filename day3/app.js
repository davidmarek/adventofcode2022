const fs = require('fs');

function solve1() {
  const values = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return fs.readFileSync("input.txt", "utf8")
    .split('\n')
    .map(line => [line.substring(0, line.length / 2), new Set(line.substring(line.length / 2, line.length))])
    .map(([a, b]) =>
      a.split("").reduce((intersection, ch) => (b.has(ch) ? intersection.add(ch) : intersection), new Set()))
    .reduce((overalls, s) => overalls + Array.from(s.values()).reduce((total, ch) => total + values.indexOf(ch), 0), 0);
}

function solve2() {
  const values = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return fs.readFileSync("input.txt", "utf8")
    .split('\n')
    .reduce(([groups, current], line, idx) => idx % 3 == 2 ? [[...groups, [...current, line]], []] : [groups, [...current, line]], [[], []])[0]
    .map(([a, b, c]) =>
      a.split("")
        .reduce((intersection, ch) => b.indexOf(ch) != -1 && c.indexOf(ch) != -1 ? intersection.add(ch) : intersection, new Set()))
    .reduce((overalls, s) => overalls + Array.from(s.values()).reduce((total, ch) => total + values.indexOf(ch), 0), 0);
}

console.log(solve1());
console.log(solve2());