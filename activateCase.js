import getState from './state.js';

const activateCase = (
  currentCase = getState().keyBoardCase,
  secondCase = 'caseUp',
  language = getState().keyboardLanguage,
) => {
  const langKeys = document.querySelectorAll(`.${language}`);
  langKeys.forEach((el) => {
    if (el.querySelector(`.${currentCase}`)?.classList) {
      el.childNodes.forEach((elem) => {
        elem.classList.add('hidden');
      });

      el.querySelector(`.${currentCase}`)?.classList.remove('hidden');
    } else {
      el.childNodes.forEach((elem) => {
        elem.classList.add('hidden');
      });
      el.querySelector(`.${secondCase}`)?.classList.remove('hidden');
    }
  });
};
export const activeLang = (language = getState().keyboardLanguage) => {
  console.log('works');
  const langKeys = document.querySelectorAll(`.${language}`);
  console.log(langKeys);
  langKeys.forEach((el) => {
    el.classList.remove('hidden');
  });
};
export default activateCase;
