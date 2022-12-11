const _ = require('lodash');
const fs = require('fs');

const readData = () => fs.readFileSync('input.txt', 'utf8').split('\r\n\r\n');
const parseStackLine = (line) => _.chunk(line, 4).map(chunk => [chunk[1]]);
const parseStackLines = (input) => input.split('\r\n').map(parseStackLine);
const createStacks = (parsedStackLines) => _.chain(parsedStackLines)
  .reduce((acc, line) => _.zipWith(acc, line, (a, b) => _.concat(a, b)))
  .map(stack => _.takeRightWhile(stack, x => x != ' '))
  .value()
const parseStacksInput = (inputState) => {
  const stacks = parseStackLines(inputState);
  const parsedStacks = createStacks(_.take(stacks, stacks.length - 1));
  return parsedStacks.map(stack => stack.reverse())
}

const regex = 'move (\\d+) from (\\d+) to (\\d+)';
const parseCommandLine = (line) => line.match(regex).slice(1, 4).map(x => parseInt(x));
const parseCommandLines = (input) => input.split('\r\n').map(parseCommandLine);

const executeCommand = (stacks, [count, from, to]) =>
  _.times(count, () => stacks[to - 1].push(stacks[from - 1].pop()));
const executeCommands = (stacks, commands, fn) =>
  _.map(commands, (command) => fn(stacks, command));

const result = (stacks) => _.chain(stacks).map(stack => stack.pop()).join('').value();

const solve1 = () => {
  const [inputState, inputInstructions] = readData();
  const stacks = parseStacksInput(inputState);
  const parsedInstructions = parseCommandLines(inputInstructions);
  executeCommands(stacks, parsedInstructions, executeCommand);
  return result(stacks);
}

const executeCommand2 = (stacks, [count, from, to]) => {
  // TODO: replace with reduce.
  stacks[to - 1] = _.concat(stacks[to - 1], _.takeRight(stacks[from - 1], count));
  stacks[from - 1] = _.take(stacks[from - 1], stacks[from - 1].length - count);
}

const solve2 = () => {
  const [inputState, inputInstructions] = readData();
  const stacks = parseStacksInput(inputState);
  const parsedInstructions = parseCommandLines(inputInstructions);
  executeCommands(stacks, parsedInstructions, executeCommand2);
  return result(stacks);
}

console.log(solve1());
console.log(solve2());