import router from '../index.ts';
import SignIn from '../pages/SignIn/index.ts';
import authApi from '../services/api/AuthApi.ts';
import ChatController from './ChatController.ts';
import UserController from './UserController.ts';
import LastChats from '../pages/LastChats/index.ts';
import ErrorText from '../components/ErrorText/index.ts';
import type { SignInData, signUpData } from '../types/api/AuthApi.d.ts';

class LoginController {
  public async signIn(formData: SignInData): Promise<void> {
    try {
      const xhr = await authApi.signIn(formData);

      if (this._loggedIn(xhr)) {
        await this._setUserData();
        router.go(LastChats.url);
      } else {
        this._setError(xhr);
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  }

  public async signUp(formData: signUpData): Promise<void> {
    try {
      const xhr = await authApi.signUp(formData);

      if (xhr.status === 200) {
        router.go(LastChats.url);
      } else {
        this._setError(xhr);
      }
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await authApi.logout();
      router.go(SignIn.url);
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  }

  public async userLoggedIn(): Promise<boolean> {
    try {
      const xhr = await authApi.getUserInfo();
      console.log();
      if (xhr.status === 401) {
        return false;
      } if (this._loggedIn(xhr)) {
        return true;
      }
      console.error(`Unexpected status in userLoggedIn: ${xhr.response}`);
      return false;
    } catch (e) {
      console.error('Error in userLoggedIn: ', e);
      return false;
    }
  }

  private async _setUserData(): Promise<void> {
    ChatController.refreshChats();
    UserController.refreshUserData();
  }

  private _getErrorBlock(): { errorTextBlock: HTMLElement, errorText: HTMLElement } {
    const errorTextBlock: HTMLElement | null = document.querySelector(`.${ErrorText.blockClassName}`);
    const errorText: HTMLElement | null = document.querySelector(`.${ErrorText.textClassName}`);

    if (!errorTextBlock || !errorText) {
      throw new Error('Error block is not found');
    }
    return {
      errorTextBlock,
      errorText,
    };
  }

  private _setError(xhr: XMLHttpRequest): void {
    const {
      errorTextBlock,
      errorText,
    } = this._getErrorBlock();

    errorTextBlock.style.display = 'none';

    const responseData = JSON.parse(xhr.responseText);
    const { reason } = responseData;

    if (reason) {
      errorText.textContent = reason;
    } else {
      errorText.textContent = 'Неизвестная ошибка';
    }

    errorTextBlock.style.display = 'block';
  }

  private _loggedIn(xhr: XMLHttpRequest) {
    return xhr.status === 200 || (xhr.status === 400 && JSON.parse(xhr.response).reason === 'User already in system');
  }
}

export default new LoginController();
