import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Button from '../../components/Button';
import ChangePassword from '../ChangePassword';
import { PropsAndChildren } from '../../types/Block';
import InputForm from '../../components/InputForm';
import BackButton from '../../components/BackButton';
import Input from '../../components/InputWithLabel/Input';
import InputWithLabel from '../../components/InputWithLabel';
import {
  inputValidator,
  validateName,
  validateLogin,
  validateEmail,
  validatePhone,
} from '../../utils/validations.ts';

export default class ProfileSettings extends Block {
  constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
    propsAndChildren = {
      ...propsAndChildren,
      backButton: new BackButton(),
      changePasswordButton: new Button('button', {
        label: 'Change password',
        link: new ChangePassword(),
      }),
      inputForm: new InputForm('form', {
        formId: 'profileSettingsForm',
        inputs: [
          new InputWithLabel('div', {
            label: 'Email',
            input: new Input('input', {
              id: 'email',
              editable: true,
              events: {
                blur: inputValidator(validateEmail),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Login',
            input: new Input('input', {
              id: 'login',
              editable: true,
              events: {
                blur: inputValidator(validateLogin),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'First name',
            input: new Input('input', {
              id: 'first_name',
              editable: true,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Second name',
            input: new Input('input', {
              id: 'second_name',
              editable: true,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Display name',
            input: new Input('input', {
              id: 'display_name',
              editable: true,
            }),

          }),
          new InputWithLabel('div', {
            label: 'Phone',
            input: new Input('input', {
              id: 'phone',
              editable: true,
              events: {
                blur: inputValidator(validatePhone),
              },
            }),

          }),
        ],
        inputsContainerClass: 'profile_settings__inputs',
        submitButton: new Button('button', {
          label: 'Save changes',
          type: 'submit',
        }),
        submitContainerClass: 'profile_settings__buttons profile_settings__buttons__submit_button',
      }),
    };

    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}
