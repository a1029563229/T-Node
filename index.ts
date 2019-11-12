import TNode, { Component } from './packages/tnode';
import Index from './index.tjx';

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
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(document.querySelector('.container'));
    }

    render() {
        return Index
    }
}

TNode.render(
    TNode.createElement(App as Component<AppState, {}>),
    document.getElementById('root')
);