import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenLink extends PropsAndChildren {
    title: string;
    contentPage: Block;
}

export default class Link extends Block {
  constructor(propsAndChildren: IPropsAndChildrenLink, tagName: string = 'li') {
    const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }

    props.events.click = function redirect(event: PointerEvent) {
      window.page.setProps({ content: props.contentPage });
      event.preventDefault();
      event.stopPropagation();
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
