import { isPrimitive } from './utils';
import Element, { TAG_TYPE } from './Element';
import { RenderItem } from './RenderItem';
import Component from './Component';

class Render {
  private element: Element;
  private mountedNode: HTMLElement;
  private renderItems: RenderItem[] = [];
  private componentList: Component[] = [];

  constructor(element: Element, mountedNode: HTMLElement) {
    this.element = element;
    this.mountedNode = mountedNode;
  }

  public run(): HTMLElement {
    const element = this.element;
    const domTree = this.getDomTree(element);
    this.mountedNode.appendChild(domTree);
    this.componentList.map(c => c.componentDidMount && c.componentDidMount());
    return this.mountedNode;
  }

  /**
   * 
   * @param tagType 标签类型
   * @param renderItem 渲染器
   */
  public addRenderItem(tagType: TAG_TYPE, renderItem: RenderItem): void {
    this.renderItems[tagType] = renderItem;
  }

  private getDomTree(element: Element, parentNode?: HTMLElement): HTMLElement {
    const renderItem = this.renderItems[element.tag.type] as RenderItem;
    let htmlNode = element.el = (<RenderItem>renderItem).render(element);
    if (htmlNode) {
      parentNode && parentNode.appendChild(htmlNode)
    } else {
      // 没有生成 htmlNode 则为 component
      this.componentList.unshift(renderItem.component);
    }

    if (element.children.some(ele => !isPrimitive(ele))) {
      element.children.forEach(child => {
        if (!isPrimitive(child)) {
          const childNode = this.getDomTree(child as Element, htmlNode || parentNode);
          htmlNode = htmlNode || childNode;
        }
      });
    }
    return htmlNode;
  }
}

export default Render;