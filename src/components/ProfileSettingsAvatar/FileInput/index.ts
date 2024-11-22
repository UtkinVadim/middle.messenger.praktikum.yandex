import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';
import AvatarController from '../../../controllers/AvatarController.ts';

export default class FileInput extends Block {
  constructor(tagName: string = 'input', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.type = 'file';
    props.attr.id = 'avatarInput';
    props.attr.style = 'display: none';

    if (!props.events) {
      props.events = {};
    }
    props.events.change = function onChange(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const { files } = target;
      if (!files) {
        return;
      }
      const file: File = files[0];
      AvatarController.setNewAvatar(file);
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
