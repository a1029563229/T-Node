import { isPrimitive } from './utils';
import Element from "./element";
import { Component } from '..';

interface RenderItem {
  component?: Component;
  render(element: Element): HTMLElement;
}

class ElementRenderItem implements RenderItem {
  private element: Element;

  public render(element: Element): HTMLElement {
    this.element = element;
    const { name: tagName } = this.element.tag;
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
    this.element.children.forEach((child: string | Element) => {
      if (isPrimitive(child)) {
        node.innerText += child;
      }
    });
  }
}

class ComponentRenderItem implements RenderItem {
  component: Component;

  public render(element: Element): HTMLElement {
    const Ctr = <typeof Component>element.tag.Ctr;
    element.ref = this.component = new Ctr();
    this.component.componentWillMount && this.component.componentWillMount();
    const nodes = element.ref.render();
    console.log({ nodes });
    element.children = [nodes];
    return null;
  }
}

export { RenderItem, ElementRenderItem, ComponentRenderItem }