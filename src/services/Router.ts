import Block from './Block.ts';
import isEqual from '../utils/isEqual.ts';
import authApi from './api/AuthApi.ts';
import router from '../index.ts';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const unauthorizedLinks = [SignIn.url, SignUp.url];

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

export default class Router {
  public routes: Route[];
  public history: History;

  protected _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  public use(pathname: string, block: Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  public start(): void {
    window.onpopstate = ((event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (!unauthorizedLinks.includes(pathname)) {
      authApi.getUserInfo()
        .then((xhr) => {
          if (xhr.status === 401) {
            router.go(SignIn.url);
          } else {
            route.render();
          }
        });
    } else {
      route.render();
    }
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  public back(): void {
    this.history.back();
  }
}
