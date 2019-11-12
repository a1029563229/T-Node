const ast = require('./ast')

class Parser {
  constructor() {
    this.elOList = [];
    this.elCList = [];
    this.virtualDom = {};
    this.deep = -1;
  }

  run(htmlStr) {
    this.matchStr(htmlStr.replace(/\n/g, ''));
    return this.virtualDom;
  }

  matchStr(str) {
    if (!str.length) return;
    const tagRE = /(?<=<).*?(?=>)/;
    const tag = str.match(tagRE);
    if (this.deep > 3) return;
    if (!tag) return;

    const [tagStr] = tag;
    if (tagStr.indexOf('/') > -1) {
      this.buildCloseTag(str, tagStr);
    } else {
      this.buildOpenTag(str, tagStr);
    }

    this.virtualDom = this.elCList[0];
  }

  buildOpenTag(str, tagStr) {
    this.deep++;
    const element = this.buildElement(tagStr);
    this.elOList.push(element);
    const leftStr = str.slice(tagStr.length + 2, str.length);
    this.matchStr(leftStr.trim());
  }

  buildElement(tag) {
    const element = {};
    const tagNameRE = /\w+/;
    const propsRE = /\w+='?\w+'?/g;
    const tagName = tag.match(tagNameRE)[0];
    const props = tag.match(propsRE) || [];
    element.name = tagName;
    element.props = props.map(prop => ({ [prop.match(/^\w+/)[0]]: prop.match(/(?<==')\w+(?=('|"))/)[0] }))
    element.children = [];
    return element;
  }

  buildCloseTag(str, tagStr) {
    const context = str.match(/.*?(?=<)/);
    const element = this.elOList.pop();
    let leftStr, content = '';
    // 匹配到内容则将内容（纯文本）添加到该节点的子节点
    if (context[0]) {
      content = context[0];
      element.children.push(this.parseContent(content))
    // 未匹配到内容则表示该标签需要关闭，将此前所有的子标签添加至该节点的子节点中完成关闭动作
    } else {
      const children = this.elCList[this.deep + 1];
      element.children = element.children.concat(children);
    }
    this.elCList[this.deep] = [...(this.elCList[this.deep--] || []), element];
    leftStr = str.slice(tagStr.length + content.length + 2, str.length).trim();
    this.matchStr(leftStr);
  }

  parseContent(contentStr) {
    const expressionStrRE = /(?<={).*?(?=})/;
    const expressionStrs = contentStr.match(expressionStrRE);
    if (!expressionStrs) return contentStr;
    const [expressionStr] = expressionStrs;
    const expression = ast(expressionStr);
    return expression;
  }
}

module.exports = function (source) {
  const parser = new Parser();
  const virtualDomTree = JSON.stringify(parser.run(source));
  return `export default ${virtualDomTree}`
}