const _ = require('lodash');
const fs = require('fs');
const { debug } = require('console');

const readInput = () => fs.readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(x => x.split(' '))
  .map(([c, n]) => [c, parseInt(n)]);

const updateHead = ([y, x], c) => {
  if (c == 'R') { return [y, x + 1]; }
  else if (c == 'L') { return [y, x - 1]; }
  else if (c == 'U') { return [y + 1, x]; }
  else if (c == 'D') { return [y - 1, x]; }
}
const updateTail = ([hy, hx], [ty, tx]) => {
  if (hy == ty && Math.abs(hx - tx) > 1) {
    return [ty, tx + Math.sign(hx - tx)];
  } else if (hx == tx && Math.abs(hy - ty) > 1) {
    return [ty + Math.sign(hy - ty), tx];
  } else if (hx != tx && hy != ty && (Math.abs(hx - tx) > 1 || Math.abs(hy - ty) > 1)) {
    return [ty + Math.sign(hy - ty), tx + Math.sign(hx - tx)];
  } else {
    return [ty, tx];
  }
}
const processInput = (input) => {
  let head = [0, 0];
  let tail = [0, 0];
  const set = new Set([tail[0] + '#' + tail[1]]);
  for (let i = 0; i < input.length; i++) {
    for (let k = 0; k < input[i][1]; k++) {
      head = updateHead(head, input[i][0]);
      tail = updateTail(head, tail);
      set.add(tail[0] + '#' + tail[1]);
    }
  }
  return set.size;
}
const dbg = ([hy, hx], t) => {
  const arr = [...Array(22)].map(() => Array(30).fill('.'));
  arr[arr.length - 1 - hy][hx] = 'H';
  for (let i = t.length - 1; i >= 0; i--) {
    arr[arr.length - 1 - t[i][0]][t[i][1]] = '' + (i + 1);
  }
  //arr.forEach(x => console.log(_.join(x, '')));
}
const processInput2 = (input) => {
  let head = [6, 6];
  let tail = [...Array(9)].map(() => [6, 6]);
  const set = new Set([tail[0] + '#' + tail[1]]);
  dbg(head, tail);
  for (let i = 0; i < input.length; i++) {
    for (let k = 0; k < input[i][1]; k++) {
      head = updateHead(head, input[i][0]);
      const arr = [head, ...tail];
      for (let j = 0; j < arr.length - 1; j++) {
        arr[j + 1] = updateTail(arr[j], arr[j + 1]);
        tail[j] = arr[j + 1];
      }
      set.add(tail[8] + '#' + tail[8]);
      //dbg(head, tail);
    }
  }
  return set.size;
}

const solve1 = () => processInput(readInput());
const solve2 = () => processInput2(readInput());
console.log(solve1());
console.log(solve2());