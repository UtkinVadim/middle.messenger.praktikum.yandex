import store from '../services/Store.ts';
import avatarApi from '../services/api/AvatarApi.ts';

class AvatarController {
  public async setNewAvatar(file: File): Promise<undefined> {
    const resizedFile = await this.resizeImage(file, 130, 130);
    const data = new FormData();
    data.append('avatar', resizedFile);
    const xhr = await avatarApi.changeAvatar(data);
    if (xhr.status !== 200) {
      throw new Error('Unable to set avatar');
    }
    const responseData = JSON.parse(xhr.response);
    store.updateUserAvatar(responseData.avatar);
  }

  public getAvatarUrl(pathToFile: string): string {
    return avatarApi.getImageUrl(pathToFile);
  }

  private resizeImage(file: File, width: number, height: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const reader = new FileReader();

      reader.onload = (event) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Unable to get canvas context'));
            return;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          }, file.type);
        };
        if (event.target && event.target.result) {
          img.src = event.target.result.toString();
        }
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

}

export default new AvatarController();