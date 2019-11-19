import TNode, { Component, createElement } from './packages/tnode';

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
    }

    render() {
        const { userInfo } = this.state;
        return `
            <section className='container'>
                <h1>标题</h1>
                <ul id='list'>
                <li className='item'>{userInfo.username}</li>
                <li className='item'>{userInfo.sex}</li>
                <li className='item'>{userInfo.age + ''}</li>
                <li className='item'>{true ? "正确值" : "错误值"}</li>
                <li className='item'>{false ? "正确值" : "错误值"}</li>
                </ul>
            </section>
            `
    }
}

TNode.render(
    TNode.createElement(App as Component<AppState, {}>),
    document.getElementById('root')
);