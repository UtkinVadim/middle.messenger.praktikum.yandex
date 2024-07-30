import './style.scss';

import tpl from './tpl';
import ChatCardMessage from "./Message";
import Block from '../../services/Block';
import {PropsAndChildren} from '../../types/Block';

interface IPropsAndChildrenChatCard extends PropsAndChildren {
    companion: string;
    lastMessages: Array<ChatCardMessage>;
    newMessagesCount?: number;
}

export default class ChatCard extends Block {
    constructor(tagName: string = 'div', propsAndChildren: IPropsAndChildrenChatCard) {
        if (!propsAndChildren.attr) {
            propsAndChildren.attr = {}
        }

        propsAndChildren.attr['class'] = 'chat_card';

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
