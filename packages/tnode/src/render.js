import { isPrimitive } from './utils';
import { TAG_TYPE } from './element';

function generateRootContainer() {
    const body = document.body;
    const root = document.createElement('section');
    root.id = 'root';
    body.appendChild(root);
    return root;
}

function getDomTree(element, parentNode) {
    if (element.tagType === TAG_TYPE.COMPONENT) {
        // TComponent
        // element.Tag 为 constructor
        element.ref = new element.Tag(element.props);
        element.ref.init();
        return getDomTree(element.ref.element);
    }

    const dom = element.el = document.createElement(element.tag);
    element.setAttributes();
    if (parentNode) {
        parentNode.appendChild(element.el);
    }
    if (Array.isArray(element.children) && element.children.length > 0) {
        element.children.forEach(child => {
            if (isPrimitive(child)) {
                dom.innerText += child;
            } else {
                getDomTree(child, dom);
            }
        });
    }
    return dom;
}

function render(element, container) {
    if (!container) {
        container = generateRootContainer();
    }
    const domTree = getDomTree(element);
    container.appendChild(domTree);
    element.ref.componentDidMount();
}

export default render;