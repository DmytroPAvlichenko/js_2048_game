'use strict';

const tbody = document.querySelector('tbody');
const table = document.querySelector('table');
// const tbodyTr = document.querySelectorAll('tbody tr');
// const tbodyTd = document.querySelectorAll('tbody td');

class Game {
  constructor(initialState) {
    this.startTable = initialState || [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }

  moveLeft() {
    Array.from(tbody.rows).forEach((row) => {
      const cells = Array.from(row.cells);
      const values = cells.map((cell) => Number(cell.textContent) || 0);

      const newValues = values.filter((v) => v !== 0);

      for (let i = 0; i < newValues.length - 1; i++) {
        if (newValues[i] === newValues[i + 1]) {
          newValues[i] *= 2;
          newValues[i + 1] = 0;
        }
      }

      const finalValues = newValues.filter((v) => v !== 0);

      while (finalValues.length < cells.length) {
        finalValues.push(0);
      }

      cells.forEach((cell, i) => {
        cell.textContent = finalValues[i] === 0 ? '' : finalValues[i];
        // cell.classList.add(`field-cell--${finalValues}`);
      });
    });

    this.genereteCellNum(1);
  }

  moveRight() {
    Array.from(tbody.rows).forEach((row) => {
      const cells = Array.from(row.cells);
      const values = cells.map((cell) => Number(cell.textContent) || 0);

      const newValues = values.filter((v) => v !== 0);

      for (let i = newValues.length - 1; i > 0; i--) {
        if (newValues[i] === newValues[i - 1]) {
          newValues[i - 1] *= 2;
          newValues[i] = 0;
        }
      }

      const finalValues = newValues.filter((v) => v !== 0);

      while (finalValues.length < cells.length) {
        finalValues.unshift(0);
      }

      cells.forEach((cell, i) => {
        cell.textContent = finalValues[i] === 0 ? '' : finalValues[i];
      });
    });
    this.getScore();
    this.genereteCellNum(1);
  }

  moveUp() {
    this.genereteCellNum(1);
  }

  moveDown() {
    this.genereteCellNum(1);
  }

  /**
   * @returns {number}
   */
  getScore() {
    const cameScore = document.querySelector('.game-score');
    const number = +cameScore.textContent;

    cameScore.textContent = number + 2;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    const statysCame = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        statysCame[i][j] =
          tbody.rows[i].cells[j].textContent !== ''
            ? +tbody.rows[i].cells[j].textContent
            : 0;
      }
    }

    return statysCame;
  }
  /**
   * Возвращает текущий статус игры.
   *
   * @returns {string} Одно из: «бездействует», «играет»,
   *  «выигрывает», «проигрывает»
   *
   * `idle` - игра еще не началась (исходное состояние);
   * `playing` - игра в процессе;
   * `win` - игра выиграна;
   * `lose` - игра проиграна
   */
  getStatus() {}

  /**
   * Starts the game.
   */
  start() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        tbody.rows[i].cells[j].textContent =
          this.startTable[i][j] !== 0 ? this.startTable[i][j] : '';
      }
    }

    this.genereteCellNum();
    this.getState();
  }

  restart() {
    Array.from(tbody.rows).forEach((row) => {
      Array.from(row.cells).forEach((cells) => {
        cells.textContent = '';
      });
    });

    this.genereteCellNum();
  }

  genereteCellNum(count = 2) {
    const used = new Set();

    while (used.size < count) {
      const rowIndex = Math.floor(Math.random() * tbody.rows.length);
      const sellIndex = Math.floor(
        Math.random() * tbody.rows[rowIndex].cells.length,
      );
      const key = `${rowIndex}-${sellIndex}`;

      if (used.has(key)) {
        continue;
      }

      const cell = table.rows[rowIndex].cells[sellIndex];

      if (cell.textContent) {
        continue;
      }

      used.add(key);

      const cellNumberElement = Math.random() > 0.9 ? 4 : 2;

      cell.textContent = cellNumberElement;
    }
  }
}

module.exports = Game;
