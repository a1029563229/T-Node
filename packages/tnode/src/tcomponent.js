class TComponent {
    constructor(props) {
        this.props = props || {};
        this.state = {};
        this.element = {};

        this.init();
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

    init() {
        this.element = this.render();
    }
}

export default TComponent;