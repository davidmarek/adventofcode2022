const _ = require('lodash');

const monkey = (worry, monkeys, op, test, pos, neg) => {
    // https://www.calculatorsoup.com/calculators/math/lcm.php
    const newWorry = op(worry) % 9699690;
    if (newWorry % test == 0) {
        monkeys[pos].push(newWorry);
    } else {
        monkeys[neg].push(newWorry);
    }
}
/*
const monkeyOps = [
    (w, ms) => monkey(w, ms, x => x * 19, 23, 2, 3),
    (w, ms) => monkey(w, ms, x => x + 6, 19, 2, 0),
    (w, ms) => monkey(w, ms, x => x * x, 13, 1, 3),
    (w, ms) => monkey(w, ms, x => x + 3, 17, 0, 1),
];
const monkeys = [
    [79, 98],
    [54, 65, 75, 74],
    [79, 60, 97],
    [74]
]
*/
const monkeyOps = [
    (w, ms) => monkey(w, ms, x => x * 11, 19, 6, 7),
    (w, ms) => monkey(w, ms, x => x + 8, 2, 6, 0),
    (w, ms) => monkey(w, ms, x => x + 1, 3, 5, 3),
    (w, ms) => monkey(w, ms, x => x * 7, 17, 5, 4),
    (w, ms) => monkey(w, ms, x => x + 4, 13, 0, 1),
    (w, ms) => monkey(w, ms, x => x + 7, 7, 1, 4),
    (w, ms) => monkey(w, ms, x => x * x, 5, 7, 2),
    (w, ms) => monkey(w, ms, x => x + 6, 11, 2, 3),
];

const monkeys = [
    [74, 73, 57, 77, 74],
    [99, 77, 79],
    [64, 67, 50, 96, 89, 82, 82],
    [88],
    [80, 66, 98, 83, 70, 63, 57, 66],
    [81, 93, 90, 61, 62, 64],
    [69, 97, 88, 93],
    [59, 80]
];

const solve1 = () => {
    const counts = Array(8).fill(0);
    console.log(monkeys);
    for (let round = 0; round < 10000; round++) {
        for (let monkeyIdx = 0; monkeyIdx < monkeyOps.length; monkeyIdx++) {
            const monkeyItems = monkeys[monkeyIdx];
            counts[monkeyIdx] += monkeyItems.length;
            const op = monkeyOps[monkeyIdx];
            monkeys[monkeyIdx] = [];
            for (let itemIdx = 0; itemIdx < monkeyItems.length; itemIdx++) {
                op(monkeyItems[itemIdx], monkeys);
            }
        }
    }
    console.log(counts);
    const sortedCountes = _.sortBy(counts, _.identity).reverse();
    return sortedCountes[0] * sortedCountes[1];
}

console.log(solve1());