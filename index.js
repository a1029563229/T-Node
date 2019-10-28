import { TNode, TComponent } from './packages/tnode';
import { TJX } from './packages/tjx';

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

        return new TJX(
            `
                <ul id="list">
                    <li className='item'>{userInfo.username} {type}</li>
                    <li className='item'>{userInfo.sex}</li>
                    <li className='item'>{userInfo.age}</li>
                </ul>
            `
        )
    }
}

TNode.render(
    TNode.createElement(App)
);