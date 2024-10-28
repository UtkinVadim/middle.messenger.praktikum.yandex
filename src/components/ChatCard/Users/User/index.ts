import tpl from './tpl.ts';
import Block from '../../../../services/Block.ts';
import RemoveUserButton from './RemoveUserButton/index.ts';
import type { PropsAndChildren } from '../../../../types/Block.d.ts';
import type { userData } from '../../../../types/api/ChatCardApi.d.ts';

interface IPropsAndChildrenUser extends PropsAndChildren {
  chatId: number;
  userData: userData;
  removeUserButton?: RemoveUserButton;
}

export default class User extends Block {
  constructor(propsAndChildren: IPropsAndChildrenUser, tagName: string = 'li') {
    const props = { ...propsAndChildren };

    props.removeUserButton = new RemoveUserButton({chatId: props.chatId, userId: props.userData.id});

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
