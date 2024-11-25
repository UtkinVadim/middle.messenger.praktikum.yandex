import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import ChatCard from '../../components/ChatCard/index.ts';
import store, { StoreEvents } from '../../services/Store.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import ChatController from '../../controllers/ChatController.ts';
import LogoutButton from '../../components/LogoutButton/index.ts';
import SettingsButton from '../../components/SettingsButton/index.ts';
import CreateChatButton from '../../components/CreateChatButton/index.ts';
import CreateChatModalPage from '../../components/CreateChatModalPage/index.ts';

interface IPropsAndChildrenLastChats extends PropsAndChildren {
  chatCards?: Array<ChatCard>;
  logoutButton?: LogoutButton;
  settingsButton?: SettingsButton;
  createChatButton?: CreateChatButton;
  createChatModalPage?: CreateChatModalPage;
}

export default class LastChats extends Block {
  public static url: string = '/messenger';

  constructor(propsAndChildren: IPropsAndChildrenLastChats = {}, tagName: string = 'main') {
    const props = { ...propsAndChildren };

    props.createChatButton = new CreateChatButton({ attr: { class: 'create_chat menu_button' } });
    props.logoutButton = new LogoutButton({ attr: { class: 'menu_button' } });
    props.settingsButton = new SettingsButton({ attr: { class: 'menu_button' } });
    props.createChatModalPage = new CreateChatModalPage();

    ChatController.refreshChats()
      .then(() => {
        props.chatCards = store.getState().chats;
      });

    super(tagName, props);

    store.on(StoreEvents.ChatsUpdated, () => {
      this.setProps({ chatCards: store.getState().chats });
      this._render();
    });
  }

  render() {
    return this.compile(tpl);
  }
}
