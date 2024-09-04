import tpl from './tpl.ts';
import ChatCard from '../ChatCard';
import Block from '../../services/Block.ts';
import store from '../../services/Store.ts';
import ChatsApi from '../../services/api/ChatsApi.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';


export default class CreateChatButton extends Block {
  constructor(propsAndChildren: PropsAndChildren, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      const chatData = {title: "ChatTitle"};
      ChatsApi.createChat(chatData).then((response) => {
        console.log(response.responseText);
      })

      const chatCard = new ChatCard({title: 'Имя'});
      store.addChat(chatCard);
    };
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}
