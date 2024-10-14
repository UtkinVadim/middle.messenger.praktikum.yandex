import BaseAPI from './BaseApi.ts';
import type { changeAvatarData } from '../../types/api/AvatarApi.d.ts';

class AvatarApi extends BaseAPI {
  public async changeAvatar(data: changeAvatarData): Promise<XMLHttpRequest> {
    const path = '/user/profile/avatar';

    return await this._put(path, data);
  }

  public async uploadImage(data: changeAvatarData): Promise<XMLHttpRequest> {
    const path = '/resources';

    return await this._post(path, data);
  }

  public async getImage(pathToFile: string): Promise<XMLHttpRequest> {
    const path = `/resources/${pathToFile}`;

    return await this._get(path);
  }
}

export default new AvatarApi();
