import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import Button from '../../components/Button/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import InputForm from '../../components/InputForm/index.ts';
import BackButton from '../../components/BackButton/index.ts';
import Input from '../../components/InputWithLabel/Input/index.ts';
import InputWithLabel from '../../components/InputWithLabel/index.ts';
import { inputValidator, validatePassword } from '../../utils/validations.ts';

export default class ChangePassword extends Block {
  public static url: string = '/settings/change_password';

  constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
    const props = {
      ...propsAndChildren,
      inputForm: new InputForm({
        formId: 'changePasswordForm',
        inputs: [
          new InputWithLabel({
            label: 'Old password',
            input: new Input({
              id: 'oldPassword',
              inputType: 'password',
              editable: false,
              events: {
                blur: inputValidator(validatePassword),
              },
            }),
          }),
          new InputWithLabel({
            label: 'New password',
            input: new Input({
              id: 'newPassword',
              inputType: 'password',
              editable: false,
              events: {
                blur: inputValidator(validatePassword),
              },
            }),
          }),
          new InputWithLabel({
            label: 'New password (again)',
            input: new Input({
              id: 'passwordConfirm',
              inputType: 'password',
              editable: false,
              events: {
                blur: inputValidator(validatePassword),
              },
            }),

          }),
        ],
        inputsContainerClass: 'change_password__inputs',
        submitButton: new Button({ label: 'Save Up', type: 'submit' }),
        submitContainerClass: 'change_password__buttons',
      }),
      backButton: new BackButton(),
    };
    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
