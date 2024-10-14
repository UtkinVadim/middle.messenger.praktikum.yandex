import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

export default class Overlay extends Block {
  constructor(tagName: string = 'div', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'profile_settings__avatar_overlay';

    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      const fileInput = document.getElementById('avatarInput');
      if (!fileInput) {
        throw new Error('avatarInput not found');
      }
      fileInput.click();

    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
