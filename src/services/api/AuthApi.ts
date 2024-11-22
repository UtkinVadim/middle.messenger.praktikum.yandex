import BaseAPI from './BaseApi.ts';
import type { SignInData, signUpData } from '../../types/api/AuthApi.d.ts';

class AuthApi extends BaseAPI {
  public async signIn(data: SignInData): Promise<XMLHttpRequest> {
    const path = '/auth/signin';
    return this._post(path, data);
  }

  public async signUp(data: signUpData): Promise<XMLHttpRequest> {
    const path = '/auth/signup';
    return this._post(path, data);
  }

  public async getUserInfo(): Promise<XMLHttpRequest> {
    const path = '/auth/user';
    return this._get(path);
  }

  public async logout(): Promise<XMLHttpRequest> {
    const path = '/auth/logout';
    return this._post(path);
  }
}

export default new AuthApi();
