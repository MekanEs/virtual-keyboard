const localLang = localStorage.getItem('keyboardLanguage');
const localCase = localStorage.getItem('keyBoardCase');

const state = {
  keyboardLanguage: localLang || 'eng',
  keyBoardCase: localCase || 'caseDown',
  isCapsed: false,
};

const syncLocalStorage = () => {
  for (const key in state) {
    localStorage.setItem(`${key}`, state[key]);
  }
};
const getState = () => state;

export const setLanguage = (lang) => {
  state.keyboardLanguage = lang;
  syncLocalStorage();
};
export const setCaps = (isCapsed) => {
  state.isCapsed = isCapsed;
  return state.isCapsed;
};

export const setCase = (keyboardCase) => {
  state.keyBoardCase = keyboardCase;
  syncLocalStorage();
};

export default getState;
