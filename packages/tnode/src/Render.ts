import { isPrimitive } from './utils';
import Element, { TAG_TYPE } from './Element';
import { RenderItem } from './RenderItem';

class Render {
  private element: Element;
  private mountedNode: HTMLElement;
  private renderItems: { [key: number]: RenderItem };

  constructor(element: Element, mountedNode: HTMLElement) {
    this.element = element;
    this.mountedNode = mountedNode;
  }

  public run(): HTMLElement {
    const element = this.element;
    const domTree = this.getDomTree(element);
    this.mountedNode.appendChild(domTree);
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
    const renderItem = this.renderItems[element.tagType] as RenderItem;
    const htmlNode = element.el = renderItem.render(element);
    parentNode && parentNode.appendChild(htmlNode);
    if (element.children.some(ele => !isPrimitive(ele))) {
      element.children.forEach(child => {
        if (!isPrimitive(child)) {
          this.getDomTree(child as Element, htmlNode);
        }
      });
    }
    return htmlNode;
  }
}

export default Render;