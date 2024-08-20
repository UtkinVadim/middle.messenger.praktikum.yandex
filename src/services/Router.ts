import Block from './Block.ts';
import isEqual from '../utils/isEqual.ts';

class Route {
  protected _pathname: string;
  protected _block: Block;
  protected _props: Record<string, any>;

  constructor(pathname: string,
    block: Block,
    props: Record<string, any>) {
    this._pathname = pathname;
    this._block = block;
    this._props = props;
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render() {
    const root = document.querySelector(this._props.rootQuery);

    if (root) {
      root.innerHTML = '';
      root.appendChild(this._block.getContent());
    }

    this._block.dispatchComponentDidMount();
  }
}

export default class Router {
  public routes: Route[];
  public history: History;

  protected _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  use(pathname: string, block: Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = ((event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  back(): void {
    this.history.back();
  }
}
