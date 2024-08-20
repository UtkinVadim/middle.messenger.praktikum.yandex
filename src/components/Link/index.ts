import tpl from './tpl.ts';
import router from '../../index.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenLink extends PropsAndChildren {
  url: string;
  title: string;
}

export default class Link extends Block {
  constructor(propsAndChildren: IPropsAndChildrenLink, tagName: string = 'li') {
    const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }

    props.events.click = function redirect(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      router.go(props.url);
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
