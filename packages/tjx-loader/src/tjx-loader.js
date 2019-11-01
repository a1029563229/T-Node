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
    const props = tag.match(propsRE);
    element.name = tagName;
    element.props = props.map(prop => ({ [prop.match(/^\w+/)[0]]: prop.match(/(?<==')\w+(?=('|"))/)[0] }))
    element.children = [];
    return element;
  }

  buildCloseTag(str, tagStr) {
    const context = str.match(/^[\w\d]+/);
    const element = this.elOList.pop();
    let leftStr, content = '';
    if (context) {
      content = context[0];
      element.children.push(content)
    } else {
      const children = this.elCList[this.deep + 1];
      element.children = element.children.concat(children);
    }
    this.elCList[this.deep] = [...(this.elCList[this.deep--] || []), element];
    leftStr = str.slice(tagStr.length + content.length + 2, str.length).trim();
    this.matchStr(leftStr);
  }
}

module.exports = function (source) {
  const parser = new Parser();
  const virtualDomTree = JSON.stringify(parser.run(source));
  return virtualDomTree;
}