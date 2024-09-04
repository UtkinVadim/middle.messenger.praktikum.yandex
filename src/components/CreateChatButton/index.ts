import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import chatController from '../../controllers/ChatController.ts';


export default class CreateChatButton extends Block {
  constructor(propsAndChildren: PropsAndChildren, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      chatController.createChat()
    };
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}