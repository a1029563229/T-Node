import TNode, { Component } from './packages/tnode';
import Tjx from './index.tjx';
console.log({ Tjx });

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

    componentWillMount() {
        console.log('componentWillMount');
        console.log(document.querySelector('ul'));
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(document.querySelector('ul'));
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