import router from '../index.ts';
import store from '../services/Store.ts';
import LastChats from '../pages/LastChats';
import { userInfo } from '../types/api/AuthApi';
import userApi from '../services/api/UserApi.ts';
import authApi from '../services/api/AuthApi.ts';
import ProfileSettings from '../pages/ProfileSettings/index.ts';
import type { changeUserData, changePasswordData } from '../types/api/UserApi.d.ts';

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

  public async saveUserProfile(data: changeUserData): Promise<void> {
    const xhr = await userApi.saveUserProfile(data);
    if (xhr.status !== 200) {
      throw new Error('Save user data error');
    }
    await this.refreshUserData();
    router.go(LastChats.url);
  }

  public async changePassword(data: changePasswordData) {
    const xhr = await userApi.changePassword(data);
    if (xhr.status !== 200) {
      throw new Error('Change password error');
    }
    router.go(ProfileSettings.url);
  }
}

export default new UserController();
