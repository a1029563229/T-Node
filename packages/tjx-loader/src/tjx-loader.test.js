const tjxLoader = require('./tjx-loader');

const tjxStr = `import TNode, { Component, createElement } from \'./packages/tnode\';\nimport Index from \'./index.tjx\'\n\ntype AppState = {\n    userInfo: {\n    username: string,\n        sex: string,\n        age: number\n    },\n    type: number\n}\n\nclass App extends Component<AppState, {}> {\n    constructor(props: {}) {\n        super(props);\n        this.state = {\n            userInfo: {\n                username: \'jack\',\n                sex: \'男\',\n                age: 22\n            },\n            type: 0\n        };\n    }\n\n    componentWillMount() {\n        console.log(\'componentWillMount\');\n    }\n\n    componentDidMount() {\n        console.log(\'componentDidMount\');\n    }\n\n    render() {\n        const { userInfo } = this.state;\n        return \`\n            <section className=\'container\'>\n                <h1>标题</h1>\n                <ul id=\'list\'>\n  <li className=\'item\'>{userInfo.name}</li>\n                <li className=\'item\'>{userInfo.sex}</li>\n                <li className=\'item\'>{userInfo.age}</li>\n                </ul>\n            </section>\n            \`\n    }\n}\n\nTNode.render(\n    TNode.createElement(App as Component<AppState, {}>),\n    document.getElementById(\'root\')\n);`;

console.log(tjxLoader(tjxStr));