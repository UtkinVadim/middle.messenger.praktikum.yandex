import BaseAPI from './BaseApi.ts';
import type { SignInData, signUpData } from '../../types/api/AuthApi.d.ts';


class AuthApi extends BaseAPI {
  public async signIn(data: SignInData): Promise<XMLHttpRequest> {
    const path = '/auth/signin';
    return await this._post(path, data);
  }

  public async signUp(data: signUpData): Promise<XMLHttpRequest> {
    const path = '/auth/signup';
    return await this._post(path, data);
  }

  public async getUserInfo(): Promise<XMLHttpRequest> {
    const path = '/auth/user';
    return await this._get(path);
  }

  public async logout(): Promise<XMLHttpRequest> {
    const path = '/auth/logout';
    return await this._post(path);
  }
}

export default new AuthApi();
