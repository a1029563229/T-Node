import { isPrimitive } from './utils';
import TElement from "./element";

interface RenderItem {
  render(element: TElement): HTMLElement;
}

class ElementRenderItem implements RenderItem {
  private element: TElement;
  
  public render(element: TElement): HTMLElement {
    this.element = element;
    const { tagName } = this.element;
    const htmlElement: HTMLElement = document.createElement(tagName);
    this.setAttributes(htmlElement);
    this.setText(htmlElement);
    return htmlElement;
  }

  private setAttributes(node: HTMLElement): void {
    const { props } = this.element;
    for (let key in props) {
      const value = props[key];
      node.setAttribute(key, value);
    }
  }

  private setText(node: HTMLElement): void {
    this.element.children.forEach((child: string | TElement) => {
      if (isPrimitive(child)) {
        node.innerText += child;
      }
    });
  }
}

export { RenderItem, ElementRenderItem }