const localLang = localStorage.getItem('keyboardLanguage');
const localCase = localStorage.getItem('keyBoardCase');

const state = {
  keyboardLanguage: localLang || 'eng',
  keyBoardCase: localCase || "caseDown",
  isCapsed: false,
};

const syncLocalStorage = () => {
  Object.entries(state).forEach((key) => {
    localStorage.setItem(`${key[0]}`, key[1]);
  });
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
