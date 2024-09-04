import BaseAPI from './BaseApi.ts';
import type { changeUserData } from '../../types/api/UserApi.d.ts';

class UserApi extends BaseAPI {
  public async saveUserProfile(data: changeUserData): Promise<XMLHttpRequest> {
    const path = '/user/profile';
    return await this._put(path, data);
  }

}

export default new UserApi();
