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
        console.log(Index);
        const render = () => {
            const message = 'test';
            return () => {
                const data = eval(`console.log(message)`);
            }
        }
        render()();
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        return Index
    }
}

TNode.render(
    TNode.createElement(App as Component<AppState, {}>),
    document.getElementById('root')
);