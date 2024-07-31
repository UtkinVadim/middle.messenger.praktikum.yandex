import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Button from '../../components/Button';
import { PropsAndChildren } from '../../types/Block';
import InputForm from '../../components/InputForm';
import Input from '../../components/InputWithLabel/Input';
import InputWithLabel from '../../components/InputWithLabel';
import { inputValidator, validateLogin, validatePassword } from '../../utils/validations';

export default class SignIn extends Block {
  constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
    propsAndChildren = {
      ...propsAndChildren,
      inputForm: new InputForm('form', {
        formId: 'signInForm',
        inputs: [
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
            label: 'Password',
            input: new Input('input', {
              id: 'password',
              editable: false,
              events: {
                blur: inputValidator(validatePassword),
              },
            }),
          }),
        ],
        inputsContainerClass: 'sign_in__inputs',
        submitButton: new Button('button', { label: 'Sign In', type: 'submit' }),
        submitContainerClass: 'sign_in__buttons',
      }),
      signUp: new Button('button', { label: 'Sign Up' }),
    };
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}
