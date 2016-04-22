function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function isDoublesEqual(a, b) {
  return Math.abs(a - b) < 1e-15;
}

function getFx(x) {
  if (x < 1 || isDoublesEqual(x, 1)) {
    return x * x;
  }
  return (x - 3) * (x - 3) - 3;
}

function getDirection(bestX) {
  let newX = bestX + (bestX * 0.01);
  let newFx = getFx(newX);
  let oldFx = getFx(bestX);
  return (newFx < oldFx || isDoublesEqual(newFx, oldFx)) ? 1 : -1;
}

let minX = -5;
let maxX = 5;

let n = 10; //шаги
let I = 1000; //кол-во итераций
let m = 500; //кол-во муравьев
let alpha = 1 / getRandom(1, 10);

let ants = [];
for (let i = 0; i < m; ++i) {
  ants.push(getRandom(minX, maxX));
}
let dx = getRandom(-alpha, alpha);

let fx = [];
for (let i = 0; i < m; ++i) {
  fx.push(getFx(ants[i]));
}

let bestAntIndex = 0;
for (let i = 1; i < fx.length; ++i) {
  if (fx[i - 1] > fx[i]) {
    bestAntIndex = i;
  }
}

for (let k = 1; k < n; ++k) {
  for (let i = 1, t = k * Math.sqrt(I); i < t; ++i) {
    for (let antIndex = 0; antIndex < ants.length; ++antIndex) {
      let newDx = getRandom(-alpha, alpha);
      let direction = getDirection(ants[bestAntIndex]);
      ants[antIndex] = ants[bestAntIndex] + direction * newDx;
      fx[antIndex] = getFx(ants[antIndex]);
    }
    let bestNewAntIndex = 0;
    for (let i = 1; i < fx.length; ++i) {
      if (fx[i - 1] > fx[i]) {
        bestNewAntIndex = i;
      }
    }
    if (fx[bestNewAntIndex] < fx[bestAntIndex]
      || isDoublesEqual(fx[bestNewAntIndex], fx[bestAntIndex])) {
      bestAntIndex = bestNewAntIndex;
    }
  }
  alpha *= 0.1;
}

console.log(`Global minimum: f(${ants[bestAntIndex]}) = ${getFx(ants[bestAntIndex])}`);


var readkey = 1;