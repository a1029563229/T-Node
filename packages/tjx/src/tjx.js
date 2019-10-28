class TJX {
  constructor(template) {
    this.template = template;
    return this.parser();
  }
  
  parser() {
    console.log(this.template);
  }
}

export default TJX;