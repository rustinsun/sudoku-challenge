const fs = require('fs');
const { EOL } = require('os');
const puzzles = fs.readFileSync('./puzzles.txt', 'utf-8');

let formatedPuzzles = puzzles.replaceAll('-', '0').split(`${EOL}`).slice(0, -1);
let onePuzzle = formatedPuzzles[0].match(/(\d\d\d\d\d\d\d\d\d)/g, '');

function transformer(array) {
  let matrix = [];
  for (let i = 0; i < array.length; i++) {
    matrix.push(array[i].match(/(\d)/g, ''));
  }
  return matrix;
}

let matrix = transformer(onePuzzle);
