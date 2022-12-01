const fs = require('fs/promises');

async function solve1() {
  const data = await fs.readFile('./input.txt', { encoding: 'utf8' });
  const splitData = data.split('\n');
  const result = Math.max(...splitData.reduce(([best, last], line) => {
    return (line == '' ? [Math.max(best, last), 0] : [best, last + parseInt(line)]);
  }, [0, 0]));
  console.log(result);
}

async function solve2() {
  const data = await fs.readFile('./input.txt', { encoding: 'utf8' });
  const splitData = data.split('\n');
  const result = splitData
    .reduce(([arr, last], line) =>
      (line == '' ? [arr.concat(last), 0] : [arr, last + parseInt(line)]),
      [[], 0])
    .reduce((arr, x) => arr.concat([x]))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, x) => total + x);
  console.log(result);
}

solve2();