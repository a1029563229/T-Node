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
        this.init(tag);
    }

    private init(tag: Tag): void {
        switch (this.tagType) {
            default: break;
            case TAG_TYPE.COMPONENT:
                this.ref = new (<typeof Component>tag.tagOrCtr)();
                this.children = [this.ref.render()];
                break;
        }
    }
}

export default Element;