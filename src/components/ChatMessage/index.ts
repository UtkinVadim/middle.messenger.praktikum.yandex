import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenChatMessage extends PropsAndChildren {
    text: string;
    type: string
}

export default class ChatMessage extends Block {
  constructor(propsAndChildren: IPropsAndChildrenChatMessage, tagName: string = 'div') {
    const props = {
      ...propsAndChildren,
      attr: {
        class: `${propsAndChildren.type} message`,
      },
    };
    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
