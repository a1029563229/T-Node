class Parser {
  constructor() {
    this.tagOList = [];
    this.tagCList = [];
  }

  run(htmlStr) {
    this.matchStr(htmlStr);
    // console.log(this.tagOList);
    // console.log(this.tagCList);
  }

  matchStr(str) {
    if (!str.length) return;
    const tagORE = /(?<=<)(\w+|.*[^\w+])(?=>)/;
    const tagCRE = /(?<=<)\/\w+(?=>)/;
    const tagOM = str.match(tagORE);
    const [tagStr] = tagOM;
    
  }
}

module.exports = function (source) {
  const parser = new Parser();
  parser.run(source)
  return source;
}