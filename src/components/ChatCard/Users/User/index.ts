import tpl from './tpl.ts';
import Block from '../../../../services/Block.ts';
import type { PropsAndChildren } from '../../../../types/Block.d.ts';
import type { userData } from '../../../../types/api/ChatCardApi.d.ts';

interface IPropsAndChildrenUser extends PropsAndChildren {
  userData: userData;
}

export default class User extends Block {
  constructor(propsAndChildren: IPropsAndChildrenUser, tagName: string = 'li') {
    const props = { ...propsAndChildren };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
