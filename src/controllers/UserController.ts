import store from '../services/Store.ts';
import authApi from '../services/api/AuthApi.ts';
import { userInfo } from '../types/api/AuthApi';

class UserController {
  public async getUserInfo(): Promise<userInfo> {
    const xhr = await authApi.getUserInfo();
    if (xhr.status !== 200) {
      throw new Error('Unable to get user information');
    }
    return JSON.parse(xhr.response);
  }

  public async refreshUserData(): Promise<void> {
    const userInfo: userInfo = await this.getUserInfo();
    store.updateUserInfo(userInfo);
  }
}

export default new UserController();
