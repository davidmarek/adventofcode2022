const _ = require('lodash');
const fs = require('fs');

const readInput = () => _.chain(fs.readFileSync('input.txt', 'utf8'))
  .split(/\n?\$ /)
  .tail()
  .map(line => line.split('\n'))
  .value();

let root = { children: {}, filesSize: 0, parent: null, name: '/' }

const cd = (dest, currentDir) => {
  if (dest == "..") {
    return currentDir.parent;
  } else if (dest == "/") {
    return root;
  } else {
    if (currentDir.children[dest] == undefined) {
      currentDir.children[dest] = { children: {}, filesSize: 0, parent: currentDir, name: dest };
    }
    return currentDir.children[dest];
  }
};
const lsLine = ([a, b], currentDir) => {
  if (a == "dir") {
    if (currentDir.children[b] == undefined) {
      currentDir.children[b] = { children: {}, filesSize: 0, parent: currentDir, name: b };
    }
  } else {
    currentDir.filesSize += parseInt(a);
  }
  return currentDir;
};
const ls = (records, currentDir) => _.chain(records)
  .map(record => record.split(' '))
  .reduce((cur, [a, b]) => lsLine([a, b], cur), currentDir)
  .value();
const proceessCommand = (command, currentDir) => {
  if (_.startsWith(command[0], 'cd')) {
    return cd(command[0].split(' ')[1], currentDir);
  } else {
    return ls(_.tail(command), currentDir);
  }
};
const proceessCommands = (commands, currentDir) =>
  commands.reduce((cur, command) => proceessCommand(command, cur), currentDir);

const updateTotals = (dir) => {
  let total = dir.filesSize;
  for (const key in dir.children) {
    total += updateTotals(dir.children[key]);
  }
  dir.filesSize = total;
  return total;
}

let total = 0;
const findAllDirs = (dir) => {
  if (dir.filesSize < 100000) {
    total += dir.filesSize;
  }
  for (const key in dir.children) {
    findAllDirs(dir.children[key]);
  }
}

const solve1 = () => {
  root = { children: {}, filesSize: 0, parent: null, name: '/' }
  const data = readInput();
  proceessCommands(data, root);
  updateTotals(root);
  findAllDirs(root);
  return total;
}

const findFolderToDelete = (minimumRequired, dir) => {
  let best = dir.filesSize;
  for (const key in dir.children) {
    if (dir.children[key].filesSize >= minimumRequired) {
      const bestFromChildren = findFolderToDelete(minimumRequired, dir.children[key]);
      if (bestFromChildren < best) {
        best = bestFromChildren;
      }
    }
  }
  return best;
}

const solve2 = () => {
  root = { children: {}, filesSize: 0, parent: null, name: '/' }
  const maxSpace = 70000000;
  const neededSpace = 30000000;
  const data = readInput();
  proceessCommands(data, root);
  updateTotals(root);
  const occupiedSpace = root.filesSize;
  const minimumToRemove = occupiedSpace - (maxSpace - neededSpace);
  return findFolderToDelete(minimumToRemove, root);
}

console.log(solve1());
console.log(solve2());