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
}