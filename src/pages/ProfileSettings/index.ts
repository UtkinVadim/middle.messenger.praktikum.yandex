import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import Button from '../../components/Button/index.ts';
import ChangePassword from '../ChangePassword/index.ts';
import InputForm from '../../components/InputForm/index.ts';
import store, { StoreEvents } from '../../services/Store.ts';
import BackButton from '../../components/BackButton/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import userController from '../../controllers/UserController.ts';
import type { userInfoData } from '../../types/api/AuthApi.d.ts';
import Input from '../../components/InputWithLabel/Input/index.ts';
import type { changeUserData } from '../../types/api/UserApi.d.ts';
import InputWithLabel from '../../components/InputWithLabel/index.ts';
import ProfileSettingsAvatar from '../../components/ProfileSettingsAvatar/index.ts';
import {
  inputValidator,
  validateName,
  validateLogin,
  validateEmail,
  validatePhone,
} from '../../utils/validations.ts';

interface inputMapData {
  [key: string]: Input;
}

export default class ProfileSettings extends Block {
  public static url: string = '/settings';

  constructor(changePasswordBlock: ChangePassword, propsAndChildren: PropsAndChildren = {}, tagName: string = 'main') {
    const emailInput = new Input({
      id: 'email',
      editable: true,
      events: {
        blur: inputValidator(validateEmail),
      },
    });
    const loginInput = new Input({
      id: 'login',
      editable: true,
      events: {
        blur: inputValidator(validateLogin),
      },
    });
    const firstNameInput = new Input({
      id: 'first_name',
      editable: true,
      events: {
        blur: inputValidator(validateName),
      },
    });
    const secondNameInput = new Input({
      id: 'second_name',
      editable: true,
      events: {
        blur: inputValidator(validateName),
      },
    });
    const displayNameInput = new Input({
      id: 'display_name',
      editable: true,
    });
    const phoneInput = new Input({
      id: 'phone',
      editable: true,
      events: {
        blur: inputValidator(validatePhone),
      },
    });

    const props = {
      ...propsAndChildren,
      backButton: new BackButton(),
      changePasswordButton: new Button({
        label: 'Change password',
        link: changePasswordBlock,
      }),
      inputForm: new InputForm({
        formId: 'profileSettingsForm',
        inputs: [
          new InputWithLabel({
            label: 'Email',
            input: emailInput,
          }),
          new InputWithLabel({
            label: 'Login',
            input: loginInput,

          }),
          new InputWithLabel({
            label: 'First name',
            input: firstNameInput,

          }),
          new InputWithLabel({
            label: 'Second name',
            input: secondNameInput,

          }),
          new InputWithLabel({
            label: 'Display name',
            input: displayNameInput,

          }),
          new InputWithLabel({
            label: 'Phone',
            input: phoneInput,

          }),
        ],
        inputsContainerClass: 'profile_settings__inputs',
        submitButton: new Button({
          label: 'Save changes',
          type: 'submit',
        }),
        submitContainerClass: 'profile_settings__buttons profile_settings__buttons__submit_button',
        onSubmit: ProfileSettings.onSubmit,
      }),
      avatar: new ProfileSettingsAvatar(),
    };

    super(tagName, props);

    store.on(StoreEvents.UserInfoUpdated, () => {
      const { userInfo } = store.getState();
      const inputMap: inputMapData = {
        email: emailInput,
        login: loginInput,
        first_name: firstNameInput,
        second_name: secondNameInput,
        display_name: displayNameInput,
        phone: phoneInput,
      };

      Object.entries(userInfo)
        .forEach(([key, value]) => {
          const input = inputMap[key];
          if (!input) {
            return;
          }
          const newProps = { attr: { value } };
          input.setProps(newProps);
        });
    });
  }

  render() {
    return this.compile(tpl);
  }

  public static onSubmit(formData: userInfoData): void {
    const dataToSave: changeUserData = {
      first_name: formData.first_name,
      second_name: formData.second_name,
      login: formData.login,
      email: formData.email,
      phone: formData.phone,
      display_name: formData.display_name,
    };
    userController.saveUserProfile(dataToSave);
  }
}
