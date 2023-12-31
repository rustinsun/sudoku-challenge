const { log } = require('console');
const fs = require('fs');
const { EOL } = require('os');
const puzzles = fs.readFileSync('./puzzles.txt', 'utf-8');

let formatedPuzzles = puzzles.replaceAll('-', '0').split(`${EOL}`).slice(0, -1);
let onePuzzle = formatedPuzzles[0].match(/(\d\d\d\d\d\d\d\d\d)/g, '');

//

let formatPuzzles = puzzles.replaceAll('-', '0').split(`${EOL}`).slice(0, -1);

let str = formatPuzzles.map((el) => el.split(''));

for (let j = 0; j < str.length; i++) {
  let arr = str[j];
  let result = [];

  for (let i = 0; i < arr.length; i += 9) {
    let chunk = arr.slice(i, i + 9);
    result.push(chunk);
  }
  return result;
}

console.log(result);

// console.log(str);

// function transformer(array) {
//   let result = [];

//   //
//   let matrix = [];
//   for (let i = 0; i < array.length; i++) {
//     matrix.push(array[i].match(/(\d)/g, ''));
//   }
//   return matrix;
// }

// let matrix = transformer(onePuzzle);
// console.log(matrix);

// function strToNum(array) {
//   for (let i = 0; i < array.length; i += 1) {
//     for (let j = 0; j < array[i].length; j += 1) {
//       array[i][j] = Number(array[i][j]);
//     }
//   }
//   return array;
// }

// let num = strToNum(matrix);

function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return 'Решено';
}

const unAssigned = 0;

function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;

  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === unAssigned) {
        checkBlankSpaces = true;
        break;
      }
    }
    if (checkBlankSpaces === true) {
      break;
    }
  }

  if (checkBlankSpaces === false) {
    return true;
  }

  for (let num = 1; num <= 9; num++) {
    if (isSafe(matrix, row, col, num)) {
      matrix[row][col] = num;

      if (solveSudoku(matrix)) {
        return true;
      }

      matrix[row][col] = unAssigned;
    }
  }
  return false;
}

function isSafe(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}

function usedInRow(matrix, row, num) {
  for (let col = 0; col < matrix.length; col++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInCol(matrix, col, num) {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(matrix, boxStartRow, boxStartCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}

// console.log(sudokuSolver(num));
