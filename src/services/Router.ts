import Route from './Route.ts';
import Block from './Block.ts';
import router from '../index.ts';
import authApi from './api/AuthApi.ts';
import SignIn from '../pages/SignIn/index.ts';
import SignUp from '../pages/SignUp/index.ts';

const unauthorizedLinks = [SignIn.url, SignUp.url];

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
    });

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
    return this.routes.find((route) => route.match(pathname));
  }

  public back(): void {
    this.history.back();
  }
}
