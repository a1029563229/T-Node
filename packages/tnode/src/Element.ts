import Tag from './Tag';

export enum TAG_TYPE {
    ELEMENT,
    COMPONENT
}

class TElement {
    public el: HTMLElement;
    public tagName: string;
    public tagType: TAG_TYPE;
    public props: {};
    public children: (TElement | string)[] = [];
    private ref: TComponent;

    constructor(tag: Tag, props: {}, children: TElement[]) {
        this.tagName = tag.name;
        this.tagType = tag.type;
        this.props = props;
        this.children = children;
    }
}

export default TElement;