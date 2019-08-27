import { TNode, TComponent } from './packages/tnode';

class App extends TComponent {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                username: 'jack',
                sex: '男',
                age: 22
            },
            type: 0
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(() => ({
                type: 1
            }));
        }, 500);
    }

    render() {
        const { userInfo, type } = this.state;

        return TNode.createElement('ul', { class: 'list', id: type }, [
            TNode.createElement('li', { class: 'item' }, [userInfo.username, type]),
            TNode.createElement('li', { class: 'item' }, [userInfo.sex]),
            TNode.createElement('li', { class: 'item' }, [userInfo.age])
        ]);
    }
}

TNode.render(
    TNode.createElement(App)
);