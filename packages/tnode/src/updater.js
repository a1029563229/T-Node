import { isPrimitive } from './utils';
import { setAttributes, setNodeContext } from './element';

const MODIFY_TYPE = {
    TEXT: 0,
    PROPS: 1,
    ALL: 2
}

class Updater {
    constructor(element) {
        this.oldElement = element;
    }

    queueUpdate(newElement) {
        this.newElement = newElement;
        this.diff();
        this.updateRender();
    }

    diff() {
        this.walkIndex = 0;
        this.patches = {};
        this.diffChildren(this.oldElement, this.newElement);
    }

    diffChildren(oldElement, newElement) {
        const { walkIndex } = this;
        const oldChildren = oldElement.children;
        const newChildren = newElement.children;

        this.patches[walkIndex] = [];
        this.diffProps(oldElement, newElement);

        if (oldChildren.length !== newChildren.length) {
            this.patches[walkIndex].push({
                type: MODIFY_TYPE.ALL,
                value: newChildren
            });
            this.walkIndex++;
            return;
        }

        for (let i = 0; i < newChildren.length; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];
            if (isPrimitive(newChild) && isPrimitive(oldChild)) {
                if (newChild !== oldChild) {
                    this.patches[walkIndex].push({
                        type: MODIFY_TYPE.TEXT,
                        value: newChildren
                    });
                    break;
                }
            } else {
                this.walkIndex++;
                this.diffChildren(oldChild, newChild);
            }
        }
    }

    diffProps(oldElement, newElement) {
        const { walkIndex } = this;
        const oldProps = oldElement.props;
        const newProps = newElement.props;
        if (Object.getOwnPropertyNames(oldProps).length !== Object.getOwnPropertyNames(newProps).length) {
            this.patches[walkIndex].push({
                type: MODIFY_TYPE.PROPS,
                value: newProps
            });
            return;
        }

        for (let key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                this.patches[walkIndex].push({
                    type: MODIFY_TYPE.PROPS,
                    value: newProps
                });
                break;
            }
        }
    }

    updateRender() {
        const root = this.oldElement.el;
        let walkIndex = 0;
        this.walkToUpdate(root, walkIndex);
    }

    walkToUpdate(root, walkIndex) {
        const { patches } = this;
        const patchList = patches[walkIndex];
        if (patchList.length > 0) {
            patchList.forEach((patch) => {
                this.updatePatch(root, patch)
            });
        }
        const children = Array.prototype.slice.call(root.children);
        if (children.length) {
            children.forEach(child => {
                this.walkToUpdate(child, ++walkIndex);
            })
        }

    }

    updatePatch(node, patch) {
        switch (patch.type) {
            default: break;
            case MODIFY_TYPE.TEXT:
                    const text = patch.value;
                setNodeContext(node, text);
                break;
            case MODIFY_TYPE.PROPS:
                    const props = patch.value;
                setAttributes(node, props);
                break;
        }
    }
}

export default Updater;