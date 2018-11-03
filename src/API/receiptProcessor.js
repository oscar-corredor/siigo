module.exports = class receiptProcessor {
  constructor(regions) {
    this.regions = regions;
  }

  processRegions() {
    this.regions.forEach(region => {
      this.processRegion(region);
    });
  }


  processRegion(region) {
    console.log("===========");
    region.lines.forEach(line => {
      this.processLine(line);
    });
  }

  processLine(line) {
    console.log("----------");
    console.log(line.words);
  }



}

exports