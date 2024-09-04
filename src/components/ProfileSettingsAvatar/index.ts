import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

export default class ProfileSettingsAvatar extends Block {
  constructor(tagName: string = 'div', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'profile_settings__avatar';

    super(tagName, props);

    this.setProps({
      events: {
        click(event: PointerEvent) {
          event.preventDefault();
          event.stopPropagation();
          console.log('Change avatar');
        },
      },
    });
  }

  render() {
    return this.compile(tpl);
  }
}
