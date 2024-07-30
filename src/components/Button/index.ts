import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';

interface IPropsAndChildrenButton extends
    PropsAndChildren {
    label: string;
    type?: string;
}

export default class Button extends Block {
    constructor(tagName: string = 'button', propsAndChildren: IPropsAndChildrenButton) {
        if (!propsAndChildren.attr) {
            propsAndChildren.attr = {};
        }

        propsAndChildren.attr['class'] = 'blue-button';

        if (propsAndChildren.type) {
            propsAndChildren.attr['type'] = propsAndChildren.type;
        }

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
