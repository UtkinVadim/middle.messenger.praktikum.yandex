import routerInstance from '../index.ts';
import Router from '../services/Router.ts';

export default class BaseController {
  protected _checkResponse(response: XMLHttpRequest, errorMessage: string) {
    if (response.status !== 200) {
      throw new Error(errorMessage);
    }
  }

  protected _getRouterObject(router: Router | null) {
    return router || routerInstance;
  }
}
