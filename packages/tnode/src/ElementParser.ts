import Tag from "./Tag";
import Element, { Props } from './Element';
import AST, { Node } from './AST';

export type PureNode = {
  name: string;
  props: Props[];
  children: PureNode[] | string[];
}

class ElementParser {
  private nodes: PureNode[];

  constructor(nodes: PureNode[]) {
    this.nodes = nodes;
  }

  public toElement(nodes: (PureNode | Node)[] = this.nodes, elements: Element[] = []): Element[] {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (typeof node == 'string') {
        elements[i] = node;
        continue;
      }

      if ((<Node>node).type) {
        elements[i] = new AST({}, <Node>node).execute() as any;
        continue;
      }

      const { name, props: propList, children } = <PureNode>node;
      const props: Props = this.getProps(propList);
      elements[i] = new Element(new Tag(name), props, []);
      this.toElement(<PureNode[]>children, <Element[]>elements[i].children);
    }
    return elements;
  }

  private getProps(propList: Props[]): Props {
    let props: Props = {};
    propList.forEach((p: Props) => {
      if (p.className) p = { class: p.className };

      props = {
        ...props,
        ...p
      }
    });
    return props;
  }
}

export default ElementParser;