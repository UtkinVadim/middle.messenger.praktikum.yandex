import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import {PropsAndChildren} from '../../types/Block';
import ChatMessage from "../ChatMessage";


export default class SendButton extends Block {
    constructor(tagName: string = 'button', propsAndChildren: PropsAndChildren = {}) {
        if (!propsAndChildren.attr) {
            propsAndChildren.attr = {};
        }

        propsAndChildren.attr['class'] = 'send-button';
        propsAndChildren.attr['type'] = 'submit';

        super(tagName, propsAndChildren);

        this.setProps({
            events: {
                click: function (event: PointerEvent) {
                    event.preventDefault();
                    event.stopPropagation();

                    let message: string = (document.querySelector('#message') as HTMLInputElement)?.value;

                    if (!message || !message.trim()) {
                        return
                    }

                    const newMessage = new ChatMessage('div', {
                        text: message,
                        type: 'sent'
                    })

                    const messages = document.querySelector('.chat__messages');

                    if (!messages) {
                        return;
                    }

                    messages.append(newMessage.getContent());
                }
            }
        })
    }

    render() {
        return this.compile(tpl);
    }
}
