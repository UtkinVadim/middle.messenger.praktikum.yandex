import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';

interface IPropsAndChildrenInput extends
    PropsAndChildren {
    id: string;
    label: string;
    inputType?: string;
    editable?: boolean;
}

export default class Input extends Block {
    constructor(tagName: string = 'div', propsAndChildren: IPropsAndChildrenInput) {
        propsAndChildren.attr = {class: 'input-group'};
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
