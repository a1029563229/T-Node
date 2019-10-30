import Tag from './Tag';
import Component from './Component';

export enum TAG_TYPE {
    ELEMENT,
    COMPONENT
}

class Element {
    public el: HTMLElement;
    public tagName: string;
    public tagType: TAG_TYPE;
    public props: { [key: string]: any };
    public children: (Element | string)[] = [];
    private ref: Component;

    constructor(tag: Tag, props: {} = {}, children: (Element | string)[] = []) {
        this.tagName = tag.name;
        this.tagType = tag.type;
        this.props = props;
        this.children = children;
    }
}

export default Element;