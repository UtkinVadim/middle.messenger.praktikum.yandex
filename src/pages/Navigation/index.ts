import Block from '../../services/Block.ts';

export default class Navigation extends Block {
  render() {
    return this.compile('{{{items}}}');
  }
}
