import avatarApi from '../services/api/AvatarApi.ts';

class AvatarController {
  public async setNewAvatar(file: File): Promise<undefined> {
    const data = {avatar: file};
    const xhr = await avatarApi.changeAvatar(data)
    if (xhr.status !== 200) {
      throw new Error('Unable to set avatar');
    }
  }

  public async getAvatarImage(pathToFile: string): Promise<string> {
    const xhr: XMLHttpRequest = await avatarApi.getImage(pathToFile);
    console.log(xhr.response instanceof Blob);
    const blob = xhr.response;
    return URL.createObjectURL(blob);
  }

}

export default new AvatarController();