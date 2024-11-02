import tpl from './tpl.ts';
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

    const { avatar } = store.getState().userInfo;
    if (avatar) {
      props.attr.src = AvatarController.getAvatarUrl(avatar);
    } else {
      props.attr.src = '/empty_avatar.svg';
    }

    props.attr.alt = 'Change avatar';

    super(tagName, props);

    store.on(StoreEvents.AvatarUpdated, () => {
      let avatarUrl;

      const path = store.getState().userInfo.avatar;
      if (path) {
        avatarUrl = AvatarController.getAvatarUrl(path);
      } else {
        avatarUrl = '/empty_avatar.svg';
      }

      const newProps = { attr: { src: avatarUrl } };
      this.setProps(newProps);
    });
  }

  render() {
    return this.compile(tpl);
  }
}
