import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import LoginController from '../../controllers/LoginController.ts';

export default class LogoutButton extends Block {
  constructor(propsAndChildren: PropsAndChildren, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      LoginController.logout();
    };
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}
