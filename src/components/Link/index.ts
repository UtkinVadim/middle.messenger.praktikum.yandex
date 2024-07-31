import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';

interface IPropsAndChildrenLink extends PropsAndChildren {
    title: string;
    contentPage: Block;
}

export default class Link extends Block {
  constructor(tagName: string = 'div', propsAndChildren: IPropsAndChildrenLink) {
    if (!propsAndChildren.events) {
      propsAndChildren.events = {};
    }

    propsAndChildren.events.click = function (event: PointerEvent) {
      window.page.setProps({ content: propsAndChildren.contentPage });
      event.preventDefault();
      event.stopPropagation();
    };

    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}
