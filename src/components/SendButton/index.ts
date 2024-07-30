import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';


export default class SendButton extends Block {
    constructor(tagName: string = 'button', propsAndChildren: PropsAndChildren = {}) {
        if (!propsAndChildren.attr) {
            propsAndChildren.attr = {};
        }

        propsAndChildren.attr['class'] = 'send-button';
        propsAndChildren.attr['type'] = 'submit';

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
