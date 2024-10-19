import BaseAPI from './BaseApi.ts';

class AvatarApi extends BaseAPI {
  public async changeAvatar(data: FormData): Promise<XMLHttpRequest> {
    const path = '/user/profile/avatar';
    return await this._put(path, data);
  }

  public getImageUrl(pathToFile: string): string {
    const path = `/resources/${pathToFile}`;
    return this._baseUrl + path;
  }
}

export default new AvatarApi();
