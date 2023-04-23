import insertKeyboard from "./insertKeyboard.js";
import keyboard from "./keyboard.js";

const languages = ["eng", "rus"];
const cases = ["caseDown", "caseUp"];

let shiftIsPressed = false;
let language = languages[0];
let case1 = cases[0];
window.addEventListener("load", () => {
  insertKeyboard(language);
});
const body = document.querySelector("body");
body.insertAdjacentHTML("afterbegin", '<div class="main"></div>');
const main = document.querySelector(".main");
main.insertAdjacentHTML(
  "afterbegin",
  '<h1 style="transform:translateX(-1000px)" class="main_header">RSS Virtual Keyboard</h1>'
);
main.insertAdjacentHTML(
  "beforeend",
  '<textarea class="input" rows="10" cols="50"></textarea>'
);
main.insertAdjacentHTML("beforeend", '<div class="keyboard"></div>');
let textArea1;
window.addEventListener("load", () => {
  document.querySelector(".main_header").style.transform = "translateX(0px)";
  textArea1 = document.querySelector(".input");
});

// making allowed to input symbols collection
const englishAlphabet = "abcdefghijklmnopqrstuvwxyz";
const russianAlphabet =
  "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя";
const nums = "1234567890";
const specSymbs = "\"◄▲▼►<>?/|№;%:?#$%^&*@!'=+/%?& !@#$%^&*()_+-`~/|.,[]{}\\";
const engArr = englishAlphabet.split("").reduce((acc, el) => {
  acc.push(el);
  acc.push(el.toUpperCase());
  return acc;
}, []);
const rusArr = russianAlphabet.split("");
const numsArr = nums.split("");
const allSyymbs = [...engArr, ...rusArr, ...numsArr, ...specSymbs.split("")];
let langShortCut = [];

window.addEventListener("keydown", (e) => {
  let currentKey = document.querySelector(`.${e.code}`).innerText;
  const textValue = textArea1.value;
  const start = textArea1.selectionStart;
  const end = textArea1.selectionEnd;
  e.preventDefault();

  if (allSyymbs.includes(currentKey)) {
    console.log(currentKey, e.key);
    textArea1.value =
      textValue.slice(0, start) + currentKey + textValue.slice(end);
    textArea1.selectionStart = start + 1;
    textArea1.selectionEnd = start + 1;
  }
  if (e.key === "Tab") {
    const tab = " ";

    textArea1.value =
      textValue.slice(0, start) + tab.repeat(4) + textValue.slice(end);
    textArea1.selectionStart = start + 4;
    textArea1.selectionEnd = start + 4;
  }
  if (e.key === "Enter") {
    const enter = "\n";

    textArea1.value = textValue.slice(0, start) + enter + textValue.slice(end);
    textArea1.selectionStart = start + 1;
    textArea1.selectionEnd = start + 1;
  }

  if (e.key === "Backspace") {
    if (start === end) {
      if (start === 0) {
        /* empty */
      } else {
        textArea1.value = textValue.slice(0, start - 1) + textValue.slice(end);
        textArea1.selectionStart = start - 1;
        textArea1.selectionEnd = start - 1;
      }
    } else if (start !== end) {
      textArea1.value = textValue.slice(0, start) + textValue.slice(end);
      textArea1.selectionStart = start;
      textArea1.selectionEnd = start;
    }
  }
  if (e.key === "Delete") {
    if (start === end) {
      if (start === textArea1.value.length) {
        /* empty */
      } else {
        textArea1.value = textValue.slice(0, start) + textValue.slice(end + 1);
        textArea1.selectionStart = start;
        textArea1.selectionEnd = start;
      }
    } else if (start !== end) {
      textArea1.value = textValue.slice(0, start) + textValue.slice(end);
      textArea1.selectionStart = start;
      textArea1.selectionEnd = start;
    }
  }
  if (e.key === "Control") {
    langShortCut.push(e.key);
  }
  if (e.key === "Alt" && langShortCut.includes("Control")) {
    language === "eng" ? (language = languages[1]) : (language = languages[0]);

    insertKeyboard(language);
  }
  if (e.key === "Shift") {
    if (!shiftIsPressed) {
      case1 === "caseDown" ? (case1 = cases[1]) : (case1 = cases[0]);
    }
    shiftIsPressed = true;

    insertKeyboard(language, case1);
  }
  insertKeyboard(language, case1);
  document.querySelector(`.${e.code}`).classList.add("active-key");
});

window.addEventListener("keyup", (e) => {
  langShortCut = [];
  document.querySelector(`.${e.code}`).classList.remove("active-key");
  if (e.key === "Shift") {
    case1 === "caseDown" ? (case1 = cases[1]) : (case1 = cases[0]);
    shiftIsPressed = false;
    console.log(e.key);
    insertKeyboard(language, case1);
  }
});
