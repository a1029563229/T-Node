class TComponent {
    constructor(props, updater) {
        this.props = props || {};
        this.updater = {};
        this.state = {};
        this.element = {};
    }

    setState(updater) {
        let updateData;
        if (typeof updater === 'function') {
            updateData = updater();
        } else {
            updateData = updater;
        }

        this.state = {
            ...this.state,
            ...updateData
        }
    }

    init(updater) {
        this.updater = updater;
        this.element = this.render();
    }
}

export default TComponent;