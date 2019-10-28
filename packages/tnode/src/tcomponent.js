import Updater from './updater';

class TComponent {
    constructor(props, updater) {
        this.props = props || {};
        this.updater = {};
        this.state = {};
        this.element = {};
    }

    setState(partialState) {
        let updateData;
        if (typeof partialState === 'function') {
            updateData = partialState();
        } else {
            updateData = partialState;
        }

        this.state = {
            ...this.state,
            ...updateData
        }
        this.updater.queueUpdate(this.render());
    }

    init() {
        this.element = this.render();
        const updater = new Updater(this.element);
        this.updater = updater;
    }
}

export default TComponent;