import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import Button from '../../components/Button/index.ts';
import InputForm from '../../components/InputForm/index.ts';
import Input from '../../components/InputWithLabel/Input/index.ts';
import InputWithLabel from '../../components/InputWithLabel/index.ts';
import { inputValidator, validateLogin, validatePassword } from '../../utils/validations.ts';

export default class SignIn extends Block {
  public url = '/';

  constructor(tagName = 'main', propsAndChildren = {}) {
    const props = {
      ...propsAndChildren,
      inputForm: new InputForm({
        formId: 'signInForm',
        inputs: [
          new InputWithLabel({
            label: 'Login',
            input: new Input({
              id: 'login',
              editable: false,
              events: {
                blur: inputValidator(validateLogin),
              },
            }),
          }),
          new InputWithLabel({
            label: 'Password',
            input: new Input({
              id: 'password',
              editable: false,
              events: {
                blur: inputValidator(validatePassword),
              },
            }),
          }),
        ],
        inputsContainerClass: 'sign_in__inputs',
        submitButton: new Button({ label: 'Sign In', type: 'submit' }),
        submitContainerClass: 'sign_in__buttons',
      }),
      signUp: new Button({ label: 'Sign Up' }),
    };
    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
