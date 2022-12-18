const _ = require('lodash');
const fs = require('fs');

const readData = () => fs.readFileSync('input.txt', 'utf8').split('\n');
const processInput = (commands) => {
  let reg = 1;
  let counter = 0;
  let stack = [1];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == 'noop') {
      counter++;
      stack.push(reg);
    } else {
      const val = parseInt(cmd.split(' ')[1]);
      stack.push(reg);
      stack.push(reg);
      reg += val;
      counter += 2;
    }
  }

  return stack;
}

const render = (stack) => {
  let output = '';
  for (let i = 1; i < stack.length; i++) {
    const sprite = [...Array(40)].fill('.');
    sprite[stack[i] - 1] = '#';
    sprite[stack[i]] = '#';
    sprite[stack[i] + 1] = '#';
    if (i != 1 && (i - 1) % 40 == 0) { output += '\n'; }
    output += sprite[(i - 1) % 40];
  }
  return output;
}
const computeResult = (stack) => stack[20] * 20 + stack[60] * 60 + stack[100] * 100 + stack[140] * 140 + stack[180] * 180 + stack[220] * 220;
const solve1 = () => computeResult(processInput(readData()));
const solve2 = () => render(processInput(readData()));
console.log(solve1());
console.log(solve2());