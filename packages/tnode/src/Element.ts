import Tag from './Tag';
import Component from './Component';

export enum TAG_TYPE {
    ELEMENT,
    COMPONENT
}

export type Props = { [key: string]: any };

class Element {
    public el: HTMLElement;
    public tag: Tag;
    public props: Props;
    public children: (Element | string)[] = [];
    public ref: Component;

    constructor(tag: Tag, props: {} = {}, children: (Element | string)[] = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
    }
}

export default Element;