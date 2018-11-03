module.exports = class Line {
  constructor(words) {
    this.words = words.map(word => word.text);
  }
}