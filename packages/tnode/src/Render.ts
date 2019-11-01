import { isPrimitive } from './utils';
import Element, { TAG_TYPE } from './Element';
import { RenderItem, RenderBasic } from './RenderItem';

class Render {
  private element: Element;
  private mountedNode: HTMLElement;
  private renderItems: RenderItem[] = [];
  private mountedFunList: Function[] = [];

  constructor(element: Element, mountedNode: HTMLElement) {
    this.element = element;
    this.mountedNode = mountedNode;
  }

  public run(): HTMLElement {
    const element = this.element;
    const domTree = this.getDomTree(element);
    this.mountedNode.appendChild(domTree);
    this.mountedFunList.map(mountedFn => mountedFn());
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
    const renderItem = this.renderItems[element.tag.type] as (RenderItem | RenderBasic);
    let htmlNode = element.el = (<RenderItem>renderItem).render(element);
    
    (<RenderBasic>renderItem).willMounted();
    if (htmlNode && parentNode) parentNode.appendChild(htmlNode);
    this.mountedFunList.unshift((<RenderBasic>renderItem).mounted.bind(renderItem))

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