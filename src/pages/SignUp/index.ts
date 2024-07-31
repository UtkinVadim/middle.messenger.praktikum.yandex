import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Button from '../../components/Button';
import { PropsAndChildren } from '../../types/Block';
import InputForm from '../../components/InputForm';
import Input from '../../components/InputWithLabel/Input';
import InputWithLabel from '../../components/InputWithLabel';
import {
  inputValidator,
  validateName,
  validateLogin,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../../utils/validations.ts';

export default class SignUp extends Block {
  constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
    propsAndChildren = {
      ...propsAndChildren,
      inputForm: new InputForm('form', {
        formId: 'signUpForm',
        inputs: [
          new InputWithLabel('div', {
            label: 'First name',
            input: new Input('input', {
              id: 'first_name',
              editable: false,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Second name',
            input: new Input('input', {
              id: 'second_name',
              editable: false,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Login',
            input: new Input('input', {
              id: 'login',
              editable: false,
              events: {
                blur: inputValidator(validateLogin),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Email',
            input: new Input('input', {
              id: 'email',
              editable: false,
              events: {
                blur: inputValidator(validateEmail),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Password',
            input: new Input('input', {
              id: 'password',
              editable: false,
              events: {
                blur: inputValidator(validatePassword),
              },
            }),

          }),
          new InputWithLabel('div', {
            label: 'Phone',
            input: new Input('input', {
              id: 'phone',
              editable: false,
              events: {
                blur: inputValidator(validatePhone),
              },
            }),

          }),
        ],
        inputsContainerClass: 'sign_up__inputs',
        submitButton: new Button('button', { label: 'Create profile', type: 'submit' }),
        submitContainerClass: 'sign_up__buttons',
      }),
    };
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}
