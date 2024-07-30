import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import ChatCard from "../../components/ChatCard";
import {PropsAndChildren} from '../../types/Block';

interface IPropsAndChildrenLastChats extends
    PropsAndChildren {
    chat_cards: Array<ChatCard>;
}


export default class LastChats extends Block {
    constructor(tagName: string = 'main', propsAndChildren: IPropsAndChildrenLastChats) {
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
