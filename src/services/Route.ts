import Block from './Block.ts';
import isEqual from '../utils/isEqual.ts';

export default class Route {
  protected _pathname: string;

  protected _block: Block;

  protected _props: Record<string, any>;

  constructor(
    pathname: string,
    block: Block,
    props: Record<string, any>,
  ) {
    this._pathname = pathname;
    this._block = block;
    this._props = props;
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render() {
    const root = document.querySelector(this._props.rootQuery);

    if (root) {
      root.innerHTML = '';
      root.appendChild(this._block.getContent());
    }

    this._block.dispatchComponentDidMount();
  }
}
