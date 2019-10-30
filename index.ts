import TNode, { Component } from './packages/tnode';

type AppState = {
    userInfo: {
        username: string,
        sex: string,
        age: number
    },
    type: number
}

class App extends Component<AppState, {}> {
    constructor(props: {}) {
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
        console.log('componentDidMount');
    }

    render() {
        return TNode.createElement('ul', { id: 'list' }, [
            TNode.createElement('li', { class: 'item' }, ['item1']),
            TNode.createElement('li', { class: 'item' }, ['item2']),
            TNode.createElement('li', { class: 'item' }, ['item3'])
        ]);
    }
}

TNode.render(
    TNode.createElement(App as Component<AppState, {}>),
    document.getElementById('root')
);