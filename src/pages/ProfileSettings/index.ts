import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import Button from '../../components/Button/index.ts';
import ChangePassword from '../ChangePassword/index.ts';
import InputForm from '../../components/InputForm/index.ts';
import BackButton from '../../components/BackButton/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import Input from '../../components/InputWithLabel/Input/index.ts';
import InputWithLabel from '../../components/InputWithLabel/index.ts';
import {
  inputValidator,
  validateName,
  validateLogin,
  validateEmail,
  validatePhone,
} from '../../utils/validations.ts';

export default class ProfileSettings extends Block {
  constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
    const props = {
      ...propsAndChildren,
      backButton: new BackButton(),
      changePasswordButton: new Button({
        label: 'Change password',
        link: new ChangePassword(),
      }),
      inputForm: new InputForm({
        formId: 'profileSettingsForm',
        inputs: [
          new InputWithLabel({
            label: 'Email',
            input: new Input({
              id: 'email',
              editable: true,
              events: {
                blur: inputValidator(validateEmail),
              },
            }),

          }),
          new InputWithLabel({
            label: 'Login',
            input: new Input({
              id: 'login',
              editable: true,
              events: {
                blur: inputValidator(validateLogin),
              },
            }),

          }),
          new InputWithLabel({
            label: 'First name',
            input: new Input({
              id: 'first_name',
              editable: true,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel({
            label: 'Second name',
            input: new Input({
              id: 'second_name',
              editable: true,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel({
            label: 'Display name',
            input: new Input({
              id: 'display_name',
              editable: true,
            }),

          }),
          new InputWithLabel({
            label: 'Phone',
            input: new Input({
              id: 'phone',
              editable: true,
              events: {
                blur: inputValidator(validatePhone),
              },
            }),

          }),
        ],
        inputsContainerClass: 'profile_settings__inputs',
        submitButton: new Button({
          label: 'Save changes',
          type: 'submit',
        }),
        submitContainerClass: 'profile_settings__buttons profile_settings__buttons__submit_button',
      }),
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
