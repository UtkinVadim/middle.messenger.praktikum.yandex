import Block from '../../services/Block';

import {PropsAndChildren} from '../../types/Block';

interface IPropsIndex extends PropsAndChildren {
    content: Block;
}


export default class Index extends Block {
    constructor(tagName: string = 'div', propsAndChildren: IPropsIndex) {
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile('{{{content}}}');
    }
}
