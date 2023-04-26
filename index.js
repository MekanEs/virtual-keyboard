import insertKeyboard from './insertKeyboard.js';
import insertTextArea from './insertTextarea.js';
import getSymbols from './allowedSymbols.js';
import { pressedBackspace, pressedDelete } from './currentLogic.js';
import activateCase, { activeLang } from './activateCase.js';
import getState, { setCaps, setLanguage } from './state.js';

const allowedSymbols = getSymbols();
let textArea1 = insertTextArea();
insertKeyboard();
const body = document.querySelector('body');
body.insertAdjacentHTML(
  'beforeend',
  `<div class='info'><div>Language switch combination: Ctrl + Alt</div>
    <div>The keyboard was created in the Windows operating system</div></div>`,
);
let shiftIsPressed = false;
let { isCapsed } = getState();
let controlIsPressed = false;
let CapsIsPressed = false;

activateCase();
activeLang();
body.addEventListener('keydown', (event) => {
  if (
    event.key === 'ArrowLeft'
    || event.key === 'ArrowRight'
    || event.key === 'ArrowDown'
    || event.key === 'ArrowUp'
  ) {
    document.querySelector(`.${event.code}`).classList.add('active-key');
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
      if (!isCapsed && !CapsIsPressed) {
        activateCase('caps');
        document.querySelector(`.${event.code}`).classList.add('active-key');
        isCapsed = setCaps(!isCapsed);
        CapsIsPressed = true;
      } else if (isCapsed && !CapsIsPressed) {
        activateCase('caseDown');
        document.querySelector(`.${event.code}`).classList.remove('active-key');
        isCapsed = setCaps(!isCapsed);

        CapsIsPressed = true;
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
      if (isCapsed) {
        if (shiftIsPressed) {
          activateCase('shiftCaps', 'caseDown');
        } else {
          activateCase('caps');
        }
      } else if (!isCapsed) {
        if (shiftIsPressed) {
          activateCase('caseUp', 'caseDown');
        } else {
          activateCase('caseDown');
        }
      }
    }
  }
});

body.addEventListener('keyup', (event) => {
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
  if (event.key === 'CapsLock') {
    CapsIsPressed = false;
  }
  if (event.key === 'Control') {
    controlIsPressed = false;
  }
});
const keys = document.querySelectorAll('.key');

keys.forEach((element) => {
  element.addEventListener('mouseover', (e) => {
    e.currentTarget.classList.add('hov');
  });
  element.addEventListener('mouseout', (e) => {
    e.currentTarget.classList.remove('hov');

    const newEvent = new KeyboardEvent('keyup', {
      key: e.currentTarget.innerText,
      code: e.currentTarget.classList[0],
    });
    body.dispatchEvent(newEvent);
  });
  element.addEventListener('mousedown', (e) => {
    let newEvent = 0;
    if (e.currentTarget.classList[0] === 'Space') {
      newEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
      });
    } else {
      newEvent = new KeyboardEvent('keydown', {
        key: e.currentTarget.innerText,
        code: e.currentTarget.classList[0],
      });
    }

    body.dispatchEvent(newEvent);
  });

  element.addEventListener('mouseup', (e) => {
    const newEvent = new KeyboardEvent('keyup', {
      key: e.currentTarget.innerText,
      code: e.currentTarget.classList[0],
    });
    body.dispatchEvent(newEvent);
  });
});
