import { isPrimitive } from './utils';

export const TAG_TYPE = {
    ELEMENT: 0,
    COMPONENT: 1
}

export function setAttributes(node, props) {
    for (let key in props) {
        const value = props[key];
        node.setAttribute(key, value);
    }
}

export function setNodeContext(node, context) {
    if (isPrimitive(context)) {
        return node.innerText = context;
    }
    return node.innerText = context.join('');
}

function TElement(tag, props, children) {
    this.el = null;
    this.ref = null;
    this.props = props;
    this.children = children;
    this.setTag(tag);
}

TElement.prototype.setTag = function(tag) {
    if (typeof tag === 'string') {
        this.tag = tag;
        this.tagType = TAG_TYPE.ELEMENT;
        return;
    }
    this.tag = tag.name || tag.displayName;
    this.tagType = TAG_TYPE.COMPONENT;
    this.Tag = tag;
}

TElement.prototype.setAttributes = function() {
    if (!this.el || !this.props) return;

    const props = this.props;
    setAttributes(this.el, props);
}

function createElement(tag, props, children) {
    const element = new TElement(tag, props, children);
    return element;
}

export default createElement;