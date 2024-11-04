import router from '../index.ts';
import store from '../services/Store.ts';
import userApi from '../services/api/UserApi.ts';
import authApi from '../services/api/AuthApi.ts';
import LastChats from '../pages/LastChats/index.ts';
import type { userInfoData } from '../types/api/AuthApi.d.ts';
import ProfileSettings from '../pages/ProfileSettings/index.ts';
import type { changeUserData, changePasswordData } from '../types/api/UserApi.d.ts';

class UserController {
  public async getUserInfo(): Promise<userInfoData> {
    try {
      const xhr = await authApi.getUserInfo();
      if (xhr.status !== 200) {
        throw new Error('Unable to get user information');
      }
      return JSON.parse(xhr.response);
    } catch (error) {
      console.error('Error in getUserInfo:', error);
      throw error;
    }
  }

  public async refreshUserData(): Promise<void> {
    try {
      const userInfo: userInfoData = await this.getUserInfo();
      store.updateUserInfo(userInfo);
    } catch (error) {
      console.error('Error in refreshUserData:', error);
      throw error;
    }
  }

  public async saveUserProfile(data: changeUserData): Promise<void> {
    try {
      const xhr = await userApi.saveUserProfile(data);
      if (xhr.status !== 200) {
        throw new Error('Save user data error');
      }
      await this.refreshUserData();
      router.go(LastChats.url);
    } catch (error) {
      console.error('Error in saveUserProfile:', error);
      throw error;
    }
  }

  public async changePassword(data: changePasswordData) {
    try {
      const xhr = await userApi.changePassword(data);
      if (xhr.status !== 200) {
        throw new Error('Change password error');
      }
      router.go(ProfileSettings.url);
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw error;
    }
  }
}

export default new UserController();
