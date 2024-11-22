import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

export default class ChatMessage extends Block {
  public static blockClassName: string = 'error_block';

  public static textClassName: string = 'error_text';

  constructor(propsAndChildren: PropsAndChildren = {}, tagName: string = 'div') {
    const props = {
      ...propsAndChildren,
      attr: {
        class: ChatMessage.blockClassName,
        style: 'display: none;',
      },
    };
    super(tagName, props);
  }

  public render(): HTMLElement {
    return this.compile(tpl);
  }
}
