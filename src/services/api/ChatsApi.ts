import BaseAPI from './BaseApi.ts';
import type { SignInData, signUpData, getUserInfoData } from '../../types/api/AuthApi.d.ts';


class AuthApi extends BaseAPI {
  public async signIn(data: SignInData): Promise<XMLHttpRequest> {
    const path = '/auth/signin';
    return await this._post(path, data);
  }

  public async signUp(data: signUpData): Promise<XMLHttpRequest> {
    const path = '/auth/signup';
    return await this._post(path, data);
  }

  public async getUserInfo(data: getUserInfoData): Promise<XMLHttpRequest> {
    const path = '/auth/user';
    return await this._get(path, data);
  }

  public async logout(): Promise<XMLHttpRequest> {
    const path = '/auth/logout';
    return await this._post(path);
  }
}

const authApi = new AuthApi();

export default authApi;
