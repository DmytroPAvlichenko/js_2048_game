'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

game.start();

const startGame = document.querySelector('.start');
const buttonReset = document.querySelector('.button');
const message = document.querySelector('.message-start');

let gamestart = false;

document.addEventListener('keydown', (e) => {
  if (!gamestart) {
    message.classList.add('hidden', true);
    buttonReset.classList.remove('start');
    buttonReset.classList.add('restart');
    buttonReset.textContent = 'Restart';

    gamestart = true;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
  }
});

startGame.addEventListener('click', () => {
  if (gamestart) {
    game.restart();

    startGame.classList.remove('restart');
    startGame.classList.add('start');
    startGame.textContent = 'Start';

    gamestart = false;
  } else {
    game.start();
  }
});
