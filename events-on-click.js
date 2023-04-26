const clickHandler = (e) => {
  const value = e.target;
  const options = {
    key: e.target.innerText,
    code: e.target.classlist[0],
  };
  const newEvent = new KeyboardEvent('keydown', options);
};
export default clickHandler;
