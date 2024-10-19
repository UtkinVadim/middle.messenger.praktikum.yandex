import store from '../services/Store.ts';
import avatarApi from '../services/api/AvatarApi.ts';

class AvatarController {
  public async setNewAvatar(file: File): Promise<undefined> {
    const data = new FormData();
    data.append('avatar', file);
    const xhr = await avatarApi.changeAvatar(data);
    if (xhr.status !== 200) {
      throw new Error('Unable to set avatar');
    }
    const responseData = JSON.parse(xhr.response)
    store.updateUserAvatar(responseData.avatar);
  }

  public getAvatarUrl(pathToFile: string): string {
    return avatarApi.getImageUrl(pathToFile);
  }

}

export default new AvatarController();