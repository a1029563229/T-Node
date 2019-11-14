const ast = require("./ast");
const escodegen = require('escodegen');

class Parser {
  constructor() {

  }
  
  run(virtualDom) {
    let elementTree = this.getElementTree(virtualDom[0]);
    const code = escodegen.generate(elementTree).replace(/;/g, "");
    return code;
  }

  getElementTree(virtualDom) {
    if (typeof virtualDom === 'string') {
      return ast(`'${virtualDom}'`);
    } 

    if (virtualDom.type) return virtualDom

    const props = this.getProps(virtualDom.props);
    const element = `
      createElement('${virtualDom.name}', ${JSON.stringify(props)}, [])
    `
    const et = ast(element);

    if (virtualDom.children) {
      const elements = et.expression.arguments[2].elements;
      virtualDom.children.forEach(child => {
        elements.push(this.getElementTree(child));
      })
    }
    
    return et;
  }

  getProps(propList) {
    let props = {};
    propList.forEach((p) => {
      props = {
        ...props,
        ...p
      }
    });
    return props;
  }
}

module.exports = function (source) {
  const parser = new Parser();
  const tElement = parser.run(JSON.parse(source));
  return `export default () => ${tElement}`
}