import BaseAPI from './BaseApi.ts';
import type { SignInOptions } from '../../types/api/AuthApi.d.ts';


class AuthApi extends BaseAPI {
  public async signIn(options: SignInOptions): Promise<number> {
    const path = '/auth/signin';
    const xhr: XMLHttpRequest = await this._post(path, options);
    return xhr.status
  }

  public signUp(): void {
    console.log('Sign up...');
  }

  public getUserInfo(): void {
    console.log('Get user info...');
  }

  public logout(): void {
    console.log('Logout...');
  }
}

const authApi = new AuthApi();

export default authApi;
