const { log } = require('console');

function read(i) {
  /**
   * Прочесть файл puzzles.txt в кодировке 'utf-8' и вернуть эти данные из функции
   */
  const fs = require('fs');
  const { EOL } = require('os');
  const puzzles = fs.readFileSync('./puzzles.txt', 'utf-8');
  let formatedPuzzles = puzzles
    .replaceAll('-', '0')
    .split(`${EOL}`)
    .slice(0, -1);
  let onePuzzle = formatedPuzzles[i].match(/(\d\d\d\d\d\d\d\d\d)/g, '');

  function transformer(array) {
    let matrix = [];
    for (let i = 0; i < array.length; i++) {
      matrix.push(array[i].match(/(\d)/g, ''));
    }
    return matrix;
  }

  let matrix = transformer(onePuzzle);

  function strToNum(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[i].length; j += 1) {
        array[i][j] = Number(array[i][j]);
      }
    }
    return array;
  }
  let num = strToNum(matrix);
  return num;
}

function isValid(board, num, row, col) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  let startRow = row - (row % 3);
  let startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, num, row, col)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
              return true;
            }

            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }

  return true;
}

function printBoard(board) {
  for (let row = 0; row < 9; row++) {
    let line = [];
    for (let col = 0; col < 9; col++) {
      line.push(board[row][col]);
    }
    console.log(line.join(' '));
  }
}

let board = read(14);

if (solveSudoku(board)) {
  printBoard(board);
} else {
  console.log('Нет решения');
}

console.table(solveSudoku(board));
