import Block from './Block.ts';
import render from '../utils/render.ts';
import isEqual from '../utils/isEqual.ts';


class Route {
  protected _pathname: string;
  protected _block: Block;
  protected _props: Record<string, any>;

  protected _isRendered: boolean = false;

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

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  render() {
    console.log("Render")
    if (!this._isRendered) {
      render(this._props.rootQuery, this._block);
      this._isRendered = true;
      this._block.show();
      return;
    }

    this._block.show();
  }
}

export default class Router {
  public routes: Route[];
  public history: History;

  protected _rootQuery: string;
  protected _currentRoute: Route | null = null;

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
      console.log('Pop');
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }
}
