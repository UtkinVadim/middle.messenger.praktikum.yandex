import tpl from './tpl.ts';
import Store from '../../../services/Store.ts';
import Block from '../../../services/Block.ts';
import store, { StoreEvents } from '../../../services/Store.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';
import AvatarController from '../../../controllers/AvatarController.ts';

export default class AvatarImage extends Block {
  constructor(tagName: string = 'img', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    const { avatar } = Store.getState().userInfo;
    if (avatar) {
      props.attr.src = AvatarController.getAvatarUrl(avatar);
    } else {
      props.attr.src = '/empty_avatar.svg';
    }

    props.attr.alt = 'Change avatar';

    super(tagName, props);

    store.on(StoreEvents.AvatarUpdated, () => {
      let avatarUrl;

      const path = Store.getState().userInfo.avatar;
      if (path) {
        avatarUrl = AvatarController.getAvatarUrl(path);
      } else {
        avatarUrl = '/empty_avatar.svg';
      }

      const props = { attr: { src: avatarUrl } };
      this.setProps(props);
    });
  }

  render() {
    return this.compile(tpl);
  }
}
