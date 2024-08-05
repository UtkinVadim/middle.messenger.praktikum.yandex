import Block from '../../services/Block.ts';

import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsIndex extends PropsAndChildren {
    content: Block;
}

export default class Index extends Block {
  constructor(propsAndChildren: IPropsIndex, tagName: string = 'div') {
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile('{{{content}}}');
  }
}
