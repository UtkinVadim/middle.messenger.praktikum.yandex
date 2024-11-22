import './style.scss';

import tpl from './tpl.ts';
import Overlay from './Overlay/index.ts';
import Block from '../../services/Block.ts';
import FileInput from './FileInput/index.ts';
import AvatarImage from './AvatarImage/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

export default class ProfileSettingsAvatar extends Block {
  constructor(tagName: string = 'div', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'profile_settings__avatar';
    props.overlay = new Overlay();
    props.fileInput = new FileInput();
    props.avatarImage = new AvatarImage();

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
