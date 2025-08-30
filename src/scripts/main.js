'use strict';

const Game = require('../modules/Game.class');
const game = new Game([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

const gameButton = document.querySelector('.button');
const fieldCell = document.querySelectorAll('.field-cell');
const message = document.querySelectorAll('.message');
const loseMessage = document.querySelector('.message-lose');
const winMessage = document.querySelector('.message-win');
const score = document.querySelector('.game-score');

let keydown = false;

gameButton.addEventListener('click', (cl) => {
  gameButton.classList.add('restart');
  gameButton.textContent = 'Restart';

  if (cl.target.classList.contains('start')) {
    gameButton.classList.remove('start');
    gameButton.classList.add('restart');
    gameButton.textContent = 'Restart';
    message.forEach((el) => el.classList.add('hidden'));

    keydown = true;
    game.start();
    gameBoardUpdate();
    keyPlay();

    return;
  }

  if (cl.target.classList.contains('restart')) {
    gameButton.classList.add('start');
    gameButton.classList.remove('restart');
    gameButton.textContent = 'Start';
    game.restart();
    gameBoardUpdate();
  }
});

function gameBoardUpdate(arr) {
  const gameBord = arr || game.gameStatus.flat();

  for (let i = 0; i < gameBord.length; i++) {
    const element = gameBord[i] === 0 ? '' : gameBord[i];

    fieldCell[i].textContent = element;

    fieldCell[i].classList = `field-cell field-cell--${element}`;
  }

  score.textContent = game.gameScore;

  if (game.statusGame === 'lose') {
    game.statusGame = 'lose';

    loseMessage.classList = 'message message-lose';
    game.getStatus();
  }

  if (game.statusGame === 'win') {
    game.statusGame = 'win';
    winMessage.classList = 'message message-win';
    game.getStatus();
  }
}

function keyPlay() {
  if (keydown) {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          game.moveLeft();
          gameBoardUpdate();
          break;
        case 'ArrowRight':
          game.moveRight();
          gameBoardUpdate();
          break;
        case 'ArrowUp':
          game.moveUp();
          gameBoardUpdate();
          break;
        case 'ArrowDown':
          game.moveDown();
          gameBoardUpdate();
          break;
      }
    });
  }
}
