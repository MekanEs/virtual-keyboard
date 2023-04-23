class keyboard {
  constructor(rows, lang = "eng", myCase = "caseDown") {
    this.rows = [...rows];
    this.lang = lang;
    this.case = myCase;
  }
  generateKeyboard() {
    let keyboard2 = "";
    for (let i = 0; i < this.rows.length; i++) {
      keyboard2 += `<div class =  "${i} row">`;
      let currentRow = this.rows[i];

      for (let j = 0; j < currentRow.length; j++) {
        keyboard2 += `<div class = '${currentRow[j].className} key' >${
          currentRow[j][this.lang][this.case]
        }</div>`;
      }
      keyboard2 += `</div>`;
    }
    return keyboard2;
  }
}
export default keyboard;
