import Element, { TAG_TYPE } from './src/element';
import Component from './src/Component';
import Tag from './src/tag';
import Render from './src/Render';
import { ElementRenderItem, ComponentRenderItem } from './src/RenderItem';

function createElement(tag: string | Component, props?: {}, children?: (Element | string)[]): Element {
    const element = new Element(new Tag(tag), props, children)
    return element;
}

function render(element: Element, mountedNode: HTMLElement): HTMLElement {
    const render = new Render(element, mountedNode);
    render.addRenderItem(TAG_TYPE.ELEMENT, new ElementRenderItem());
    render.addRenderItem(TAG_TYPE.COMPONENT, new ComponentRenderItem());
    return render.run();
}

export default {
    createElement,
    Element,
    Component,
    render
};

export {
    Element,
    Component,
    createElement
}