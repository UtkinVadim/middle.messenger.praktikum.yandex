import './style.scss';

import tpl from './tpl';
import Block from '../../../services/Block';
import {PropsAndChildren} from '../../../types/Block';

interface IPropsAndChildrenChatCardMessage extends PropsAndChildren {
    text: string;
}

export default class ChatCardMessage extends Block {
    constructor(tagName: string = 'p', propsAndChildren: IPropsAndChildrenChatCardMessage) {
        if (!propsAndChildren.attr) {
            propsAndChildren.attr = {}
        }

        propsAndChildren.attr['class'] = 'chat_card__last_messages__message_text';

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
