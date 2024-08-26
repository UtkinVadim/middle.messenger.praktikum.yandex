import tpl from './tpl.ts';
import router from '../../index.ts';
import SignIn from '../../pages/SignIn';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';


export default class LogoutButton extends Block {
  constructor(propsAndChildren: PropsAndChildren, tagName: string = 'button') {
        const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      router.go(SignIn.url);
    };
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}
