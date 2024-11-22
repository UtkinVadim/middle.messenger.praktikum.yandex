import './style.scss';

import tpl from './tpl.ts';
import SignUp from '../SignUp/index.ts';
import Block from '../../services/Block.ts';
import Button from '../../components/Button/index.ts';
import type { SignInData } from '../../types/api/AuthApi';
import ErrorText from '../../components/ErrorText/index.ts';
import InputForm from '../../components/InputForm/index.ts';
import Input from '../../components/InputWithLabel/Input/index.ts';
import InputWithLabel from '../../components/InputWithLabel/index.ts';
import LoginController from '../../controllers/LoginController.ts';
import { inputValidator, validateLogin, validatePassword } from '../../utils/validations.ts';

export default class SignIn extends Block {
  public static url = '/';

  constructor(signUpBlock: SignUp, tagName = 'main', propsAndChildren = {}) {
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
        submitButton: new Button({
          label: 'Sign In',
          type: 'submit',
        }),
        submitContainerClass: 'sign_in__buttons',
        onSubmit: SignIn.onSubmit,
      }),

      signUp: new Button({
        label: 'Sign Up',
        link: signUpBlock,
      }),

      errorText: new ErrorText(),
    };
    super(tagName, props);
  }

  public static onSubmit(formData: SignInData): void {
    const isFormDataInvalid = (validateLogin(formData.login) || validatePassword(formData.password));

    if (isFormDataInvalid) {
      return;
    }
    LoginController.signIn(formData);
  }

  public render(): HTMLElement {
    return this.compile(tpl);
  }
}
