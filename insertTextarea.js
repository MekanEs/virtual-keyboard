const insertTextArea = () => {
  const body = document.querySelector('body');
  body.insertAdjacentHTML('afterbegin', '<div class="main"></div>');
  const main = document.querySelector('.main');
  main.insertAdjacentHTML(
    'afterbegin',
    '<h1 style="transform:translateY(-1000px)" class="main_header">RSS Virtual Keyboard</h1>',
  );
  main.insertAdjacentHTML('beforeend', '<textarea class="input" rows="10" cols="50"></textarea>');
  main.insertAdjacentHTML('beforeend', '<div class="keyboard"></div>');
  const textArea1 = document.querySelector('.input');
  window.addEventListener('load', () => {
    document.querySelector('.main_header').style.transform = 'translateY(0px)';
  });
  textArea1.addEventListener('blur', () => {
    textArea1.focus();
  });
  textArea1.focus();
  return textArea1;
};
export default insertTextArea;
