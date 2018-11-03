const GenericRegion = require('./genericRegion')

module.exports = class DigitalReceipt {
  constructor(genericRegions) {
    this.vendorRegion = null;
    this.clientRegion = null;
    this.totalRegion = null;
    this.unidentifiedRegions = null;
    this.initializeRegions(genericRegions);
  }

  initializeRegions(genericRegions) {
    console.log(`initial generic regions: ${genericRegions.length}`);
    if (!this.vendorRegion) {
      // there can be more than one region with a NIT field
      const nitRegions = genericRegions.filter(genericRegion => genericRegion.regionContainsWord("NIT"));
      if (nitRegions.length > 0) this.vendorRegion = nitRegions[0];
      genericRegions.splice(genericRegions.indexOf(nitRegions[0]), 1);
    }
    if (!this.clientRegion) {
      const nitRegions = genericRegions.filter(genericRegion => genericRegion.regionContainsWord("NIT"));
      if (nitRegions.length > 0) this.clientRegion = nitRegions[0];
      genericRegions.splice(genericRegions.indexOf(nitRegions[0]), 1);
    }
    if (!this.totalRegion) {
      const totalRegions = genericRegions.filter(genericRegion => genericRegion.regionContainsWord("TOTAL"));
      if (totalRegions.length > 0) {
        const totalLines = []; 
        totalRegions.reduce((currentLines, totalRegion) => {
          totalRegion.lines.forEach(line => totalLines.push(line))
          // clean the list of generic regions
          genericRegions.splice(genericRegions.indexOf(totalRegion), 1);
        }, totalLines);
        this.totalRegion = new GenericRegion(totalLines);
      }
    }
    // those regions that remain, must be classified by the client.
    this.unidentifiedRegions = genericRegions;
  }


}