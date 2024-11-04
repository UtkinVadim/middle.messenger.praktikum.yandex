import './style.scss';

import tpl from './tpl.ts';
import Button from '../Button/index.ts';
import Block from '../../services/Block.ts';
import InputForm from '../InputForm/index.ts';
import CloseButton from './CloseButton/index.ts';
import Input from '../InputWithLabel/Input/index.ts';
import InputWithLabel from '../InputWithLabel/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import chatController from '../../controllers/ChatController.ts';

interface IPropsAndChildrenCreateChatModalPage extends PropsAndChildren {
  closeModalButton?: CloseButton;
  inputForm?: InputForm;
}

export default class CreateChatModalPage extends Block {
  constructor(propsAndChildren: IPropsAndChildrenCreateChatModalPage = {}, tagName: string = 'div') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'create_chat_modal_page';
    props.attr.id = 'create_chat_modal_page';

    props.closeModalButton = new CloseButton();
    props.inputForm = new InputForm({
      formId: 'create_chat_modal_page__inputFrom',
      inputs: [
        new InputWithLabel({
          label: 'Chat name',
          input: new Input({
            id: 'create_chat_modal_page__chatName',
            editable: true,
          }),
        }),
      ],
      inputsContainerClass: 'create_chat_modal_page__inputs',
      submitButton: new Button({
        label: 'Create',
        type: 'submit',
      }),
      submitContainerClass: 'create_chat_modal_page__buttons',
      onSubmit: CreateChatModalPage.onSubmit,
    });

    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }

  static onSubmit() {
    const input = document.getElementById('create_chat_modal_page__chatName') as HTMLInputElement;
    if (!input.value) {
      return;
    }
    chatController.createChat(input.value);
    const modal = document.getElementById('create_chat_modal_page') as HTMLElement;
    modal.style.display = 'none';
  }
}
