import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';

interface IPropsAndChildrenChatMessage extends PropsAndChildren {
    text: string;
    type: string
}

export default class ChatMessage extends Block {
  constructor(tagName: string = 'div', propsAndChildren: IPropsAndChildrenChatMessage) {
    propsAndChildren = {
      ...propsAndChildren,
      attr: {
        class: `${propsAndChildren.type} message`,
      },
    };
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}
