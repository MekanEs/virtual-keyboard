// making allowed to input symbols collection
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const russianAlphabet = 'АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя';
const nums = '1234567890';
const specSymbs = '"◄▲▼►<>?/|№;%:?#$%^&*@!\'=+/%?&  !@#$%^&*()_+-`~/|.,[]{}\\';
const engArr = englishAlphabet.split('').reduce((acc, el) => {
  acc.push(el);
  acc.push(el.toUpperCase());
  return acc;
}, []);
const rusArr = russianAlphabet.split('');
const numsArr = nums.split('');
const allSyymbs = [...engArr, ...rusArr, ...numsArr, ...specSymbs.split('')];
const getSymbols = () => allSyymbs;
export default getSymbols;
