export const pressedDelete = (textArea1, textValue) => {
  const NewTextarea = textArea1;
  const start = textArea1.selectionStart;
  const end = textArea1.selectionEnd;
  if (start === end) {
    if (start !== textArea1.value.length) {
      NewTextarea.value = textValue.slice(0, start) + textValue.slice(end + 1);
      NewTextarea.selectionStart = start;
      NewTextarea.selectionEnd = start;
    }
  } else if (start !== end) {
    NewTextarea.value = textValue.slice(0, start) + textValue.slice(end);
    NewTextarea.selectionStart = start;
    NewTextarea.selectionEnd = start;
  }
  return NewTextarea;
};

export const pressedBackspace = (textArea1, textValue) => {
  const NewTextarea = textArea1;
  const start = textArea1.selectionStart;
  const end = textArea1.selectionEnd;
  if (start === end) {
    if (start === 0) {
      /* empty */
    } else {
      NewTextarea.value = textValue.slice(0, start - 1) + textValue.slice(end);
      NewTextarea.selectionStart = start - 1;
      NewTextarea.selectionEnd = start - 1;
    }
  } else if (start !== end) {
    NewTextarea.value = textValue.slice(0, start) + textValue.slice(end);
    NewTextarea.selectionStart = start;
    NewTextarea.selectionEnd = start;
  }
  return NewTextarea;
};

/* if (e.key === 'Enter') {
  const enter = '\n';

  textArea1.value = textValue.slice(0, start) + enter + textValue.slice(end);
  textArea1.selectionStart = start + 1;
  textArea1.selectionEnd = start + 1;
}

if (allSyymbs.includes(currentKey)) {
  // console.log(currentKey, e.key);
  textArea1.value = textValue.slice(0, start) + currentKey + textValue.slice(end);
  textArea1.selectionStart = start + 1;
  textArea1.selectionEnd = start + 1;
}
if (e.key === 'Tab') {
  const tab = ' ';

  textArea1.value = textValue.slice(0, start) + tab.repeat(4) + textValue.slice(end);
  textArea1.selectionStart = start + 4;
  textArea1.selectionEnd = start + 4;
}
if (e.code === 'Space') {
  const space = ' ';

  textArea1.value = textValue.slice(0, start) + space + textValue.slice(end);
  textArea1.selectionStart = start + 4;
  textArea1.selectionEnd = start + 4;
}
*/
