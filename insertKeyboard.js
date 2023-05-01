import Keyboard from './keyboard.js';
import getState from './state.js';

const insertKeyboard = () => {
  const keyboard1 = new Keyboard(
    getState().keyboardLanguage,
    getState().keyBoardCase,
  ).generateKeyboard();

  document.querySelector('.keyboard').innerHTML = '';
  document.querySelector('.keyboard').insertAdjacentHTML('beforeend', keyboard1);
};

export default insertKeyboard;
