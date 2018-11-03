const Line = require('./receipt/line');
const GenericRegion = require('./receipt/genericRegion');

module.exports = class receiptProcessor {
  constructor(regions) {
    this.regions = regions;
  }

  processReceipt() {
    const genericRegions = this.generateGenericRegions();
    genericRegions.forEach(genericRegion => console.log(genericRegion.toString()));
  }

  generateGenericRegions() {
    const genericRegions = [];
    this.regions.forEach(region => {
      const lines = this.getRegionLines(region);
      const genericRegion = new GenericRegion(lines);
      genericRegions.push(genericRegion);
    });
    return genericRegions;
  }

  getRegionLines(region) {
    const regionLines = [];
    region.lines.forEach(line => {
      const regionLine = new Line(line.words);
      regionLines.push(regionLine);
    });
    return regionLines;
  }


  // processRegion(region) {
  //   console.log("===========");
  //   region.lines.forEach(line => {
  //     this.processLine(line);
  //   });
  // }

  // processLine(line) {
  //   console.log("----------");
  //   console.log(line.words);
  // }



}