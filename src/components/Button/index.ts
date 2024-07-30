import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import {PropsAndChildren} from '../../types/Block';

interface IPropsAndChildrenButton extends PropsAndChildren {
    label: string;
    type?: string;
    link?: Block;
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

        if (propsAndChildren.link) {
            if (!propsAndChildren.events) {
                propsAndChildren.events = {}
            }

            propsAndChildren.events['click'] = function (event: PointerEvent) {
                window.page.setProps({content: propsAndChildren.link});
                event.preventDefault();
                event.stopPropagation();
            }
        }

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
