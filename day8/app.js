const _ = require('lodash');
const fs = require('fs');

const readInput = () => fs.readFileSync('input.txt', 'utf8').split('\n');
const solve1 = () => {
  const data = readInput();
  const n = data.length;
  const m = data[0].length;
  let maxLeft = [...Array(n)].map(() => Array(m).fill(0));
  let maxTop = [...Array(n)].map(() => Array(m).fill(0));
  let maxRight = [...Array(n)].map(() => Array(m).fill(0));
  let maxBottom = [...Array(n)].map(() => Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const d = parseInt(data[i][j]);
      const rd = parseInt(data[n - 1 - i][m - 1 - j]);
      if (i == 0) {
        maxTop[i][j] = d;
        maxBottom[n - 1 - i][m - 1 - j] = rd;
      } else {
        maxTop[i][j] = Math.max(maxTop[i - 1][j], d);
        maxBottom[n - 1 - i][m - 1 - j] = Math.max(maxBottom[n - i][m - 1 - j], rd);
      }

      if (j == 0) {
        maxLeft[i][j] = d;
        maxRight[n - 1 - i][m - 1 - j] = rd;
      } else {
        maxLeft[i][j] = Math.max(maxLeft[i][j - 1], d);
        maxRight[n - 1 - i][m - 1 - j] = Math.max(maxRight[n - i - 1][m - j], rd);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const d = parseInt(data[i][j]);
      if (i == 0 || i == n - 1 || j == 0 || j == m - 1) {
        count++;
      } else if (d > maxLeft[i][j - 1]
        || d > maxRight[i][j + 1]
        || d > maxTop[i - 1][j]
        || d > maxBottom[i + 1][j]) {
        count++;
      }
    }
  }
  return count;
}

const solve2 = () => {
  const data = readInput();
  const n = data.length;
  const m = data[0].length;
  best = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const d = parseInt(data[i][j]);
      let left = 0;
      for (let k = j - 1; k >= 0; k--) {
        left++;
        if (parseInt(data[i][k]) >= d) {
          break;
        }
      }

      let top = 0;
      for (let k = i - 1; k >= 0; k--) {
        top++;
        if (parseInt(data[k][j]) >= d) {
          break;
        }
      }

      let right = 0;
      for (let k = j + 1; k < m; k++) {
        right++;
        if (parseInt(data[i][k]) >= d) {
          break;
        }
      }

      let bottom = 0;
      for (let k = i + 1; k < n; k++) {
        bottom++;
        if (parseInt(data[k][j]) >= d) {
          break;
        }
      }

      if (left * right * top * bottom > best) {
        best = left * right * top * bottom;
      }
    }
  }
  return best;
}

console.log(solve1());
console.log(solve2());