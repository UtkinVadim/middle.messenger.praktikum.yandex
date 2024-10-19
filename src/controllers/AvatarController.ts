import Store from '../services/Store.ts';
import avatarApi from '../services/api/AvatarApi.ts';

class AvatarController {
  public async setNewAvatar(file: File): Promise<undefined> {
    const data = {avatar: file};
    const xhr = await avatarApi.changeAvatar(data);
    if (xhr.status !== 200) {
      throw new Error('Unable to set avatar');
    }
    const newPath = xhr.response.avatar;
    Store.updateUserAvatar(newPath);
  }

  public getAvatarUrl(pathToFile: string): string {
    return avatarApi.getImageUrl(pathToFile);
  }

}

export default new AvatarController();