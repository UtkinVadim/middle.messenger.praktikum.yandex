import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import {PropsAndChildren} from '../../types/Block';
import BackButton from "../../components/BackButton";
import SendButton from "../../components/SendButton";
import ChatMessage from "../../components/ChatMessage";


interface IPropsAndChildrenChat extends PropsAndChildren {
    messages?: Array<ChatMessage>;
}



export default class Chat extends Block {
    constructor(tagName: string = 'div', propsAndChildren: IPropsAndChildrenChat = {}) {
        propsAndChildren = {
            ...propsAndChildren,
            sendButton: new SendButton(),
            backButton: new BackButton(),
            attr: {
                class: 'chat'
            }
        }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
