import store from '../services/Store.ts';
import BaseController from './BaseController.ts';
import avatarApi from '../services/api/AvatarApi.ts';

class AvatarController extends BaseController {
  public async setNewAvatar(file: File): Promise<undefined> {
    try {
      const resizedFile = await this.resizeImage(file, 130, 130);
      const data = new FormData();
      data.append('avatar', resizedFile);
      const xhr = await avatarApi.changeAvatar(data);
      this._checkResponse(xhr, 'Unable to set avatar');
      const responseData = JSON.parse(xhr.response);
      store.updateUserAvatar(responseData.avatar);
    } catch (error) {
      console.error('Error in setNewAvatar:', error);
      throw error;
    }
  }

  public getAvatarUrl(pathToFile: string): string {
    try {
      return avatarApi.getImageUrl(pathToFile);
    } catch (error) {
      console.error('Error in getAvatarUrl:', error);
      throw error;
    }
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
