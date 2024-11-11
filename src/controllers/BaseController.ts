export default class BaseController {
  protected _checkResponse(response: XMLHttpRequest, errorMessage: string) {
    if (response.status !== 200) {
      throw new Error(errorMessage);
    }
  }
}
