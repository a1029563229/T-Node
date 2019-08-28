import { TNode, TComponent } from './packages/tnode';
import store from './src/store';
import {
    UPDATE_USER_AGE,
    UPDATE_USER_NAME,
    ADD_PRODUCT,
    REVERSE_PRODUCT
} from './src/store/actions';

class App extends TComponent {
    constructor(props) {
        super(props);
        store.subscribe(() => console.log(store.getState()));
        setTimeout(() => {
            store.dispatch({
                type: ADD_PRODUCT,
                payload: '某商品'
            })
        }, 500);
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