import insertKeyboard from './insertKeyboard.js';
import insertTextArea from './insertTextarea.js';
import getSymbols from './allowedSymbols.js';
import { pressedBackspace, pressedDelete } from './currentLogic.js';
import activateCase, { activeLang } from './activateCase.js';
import getState, { setCaps, setLanguage } from './state.js';

const allowedSymbols = getSymbols();
let textArea1 = insertTextArea();
insertKeyboard();
let shiftIsPressed = false;
let { isCapsed } = getState();
let controlIsPressed = false;
window.addEventListener('keydown', (event) => {
  if (
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight' ||
    event.key === 'ArrowDown' ||
    event.key === 'ArrowUp'
  ) {
    /* empty */
  } else {
    event.preventDefault();
    if (event.key !== 'CapsLock') {
      document.querySelector(`.${event.code}`).classList.add('active-key');
    }
    if (event.key === 'Delete') {
      textArea1 = pressedDelete(textArea1, textArea1.value);
    }
    if (event.key === 'Backspace') {
      textArea1 = pressedBackspace(textArea1, textArea1.value);
    }

    if (allowedSymbols.includes(event.key)) {
      const currentSymb = document.querySelector(`.${event.code}`).innerText || ' ';

      const start = textArea1.selectionStart;
      const end = textArea1.selectionEnd;
      textArea1.value = textArea1.value.slice(0, start) + currentSymb + textArea1.value.slice(end);
      textArea1.selectionStart = start + 1;
      textArea1.selectionEnd = start + 1;
    }
    if (event.key === 'Tab') {
      const tab = ' ';
      const start = textArea1.selectionStart;
      const end = textArea1.selectionEnd;
      const textValue = textArea1.value;
      textArea1.value = textValue.slice(0, start) + tab.repeat(4) + textValue.slice(end);
      textArea1.selectionStart = start + 4;
      textArea1.selectionEnd = start + 4;
    }
    if (event.key === 'CapsLock') {
      if (!isCapsed) {
        activateCase('caps');
        document.querySelector(`.${event.code}`).classList.add('active-key');
        isCapsed = setCaps(!isCapsed);
        console.log(isCapsed);
      } else {
        activateCase('caseDown');
        document.querySelector(`.${event.code}`).classList.remove('active-key');
        isCapsed = setCaps(!isCapsed);
        console.log(isCapsed);
      }
    }
    if (event.key === 'Shift') {
      shiftIsPressed = true;
      if (isCapsed) {
        activateCase('shiftCaps', 'caseDown');
      } else {
        activateCase('caseUp', 'caseDown');
      }
    }
    if (event.key === 'Enter') {
      const enter = '\n';
      const start = textArea1.selectionStart;
      const end = textArea1.selectionEnd;
      const textValue = textArea1.value;
      textArea1.value = textValue.slice(0, start) + enter + textValue.slice(end);
      textArea1.selectionStart = start + 1;
      textArea1.selectionEnd = start + 1;
    }
    if (event.key === 'Control') {
      controlIsPressed = true;
    }
    if (event.key === 'Alt' && controlIsPressed) {
      if (getState().keyboardLanguage === 'eng') {
        setLanguage('rus');
      } else {
        setLanguage('eng');
      }

      activeLang();
    }
  }
});

window.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key !== 'CapsLock') {
    document.querySelector(`.${event.code}`).classList.remove('active-key');
  }

  if (event.key === 'Shift') {
    shiftIsPressed = false;
    if (isCapsed) {
      activateCase('caps');
    } else {
      activateCase('caseDown');
    }
  }
});
