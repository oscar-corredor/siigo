const Line = require('./line')
module.exports = class GenericRegion {
  constructor(lines) {
    this.lines = lines;
  }

  toString() {
    console.log("_____");
    this.lines.forEach(line => {
      console.log("++++++++");
      line.words.forEach(word => {
        console.log(word);
      })
    });
  }

  regionContainsWord(word) {
    return this.lines.filter(line => line.words.filter(lineWord => word.toUpperCase() === lineWord.toUpperCase()).length > 0 ).length > 0;
  }
}