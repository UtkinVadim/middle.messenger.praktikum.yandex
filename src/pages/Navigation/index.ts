import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block';

export default class Navigation extends Block {
  public url: string = '/navigation';

  constructor(propsAndChildren: PropsAndChildren = {}, tagName: string = 'ul') {
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile('{{{items}}}');
  }
}
