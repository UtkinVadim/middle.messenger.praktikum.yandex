import './style.scss';

import tpl from './tpl.ts';
import SignIn from '../SignIn';
import router from '../../index.ts';
import Block from '../../services/Block.ts';
import authApi from '../../services/api/AuthApi.ts';
import Button from '../../components/Button/index.ts';
import ErrorText from '../../components/ErrorText/index.ts';
import InputForm from '../../components/InputForm/index.ts';
import type { signUpData } from '../../types/api/AuthApi.d.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import Input from '../../components/InputWithLabel/Input/index.ts';
import InputWithLabel from '../../components/InputWithLabel/index.ts';
import {
  inputValidator,
  validateName,
  validateLogin,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../../utils/validations.ts';

export default class SignUp extends Block {
  public static url: string = '/sign-up';

  constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
    const props = {
      ...propsAndChildren,
      inputForm: new InputForm({
        formId: 'signUpForm',
        inputs: [
          new InputWithLabel({
            label: 'First name',
            input: new Input({
              id: 'first_name',
              editable: false,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
          new InputWithLabel({
            label: 'Second name',
            input: new Input({
              id: 'second_name',
              editable: false,
              events: {
                blur: inputValidator(validateName),
              },
            }),

          }),
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
            label: 'Email',
            input: new Input({
              id: 'email',
              editable: false,
              events: {
                blur: inputValidator(validateEmail),
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
          new InputWithLabel({
            label: 'Phone',
            input: new Input({
              id: 'phone',
              editable: false,
              events: {
                blur: inputValidator(validatePhone),
              },
            }),

          }),
        ],
        inputsContainerClass: 'sign_up__inputs',
        submitButton: new Button({
          label: 'Create profile',
          type: 'submit'
        }),
        submitContainerClass: 'sign_up__buttons',
        onSubmit: SignUp.onSubmit
      }),
      errorText: new ErrorText(),
    };
    super(tagName, props);
  }

  public static onSubmit(formData: signUpData): void {
    const errorTextBlock: HTMLElement | null = document.querySelector(`.${ErrorText.blockClassName}`);
    const errorText: HTMLElement | null = document.querySelector(`.${ErrorText.textClassName}`);

    if (!errorTextBlock || !errorText) {
      throw new Error('Error block is not found');
    }

    errorTextBlock.style.display = 'none';

    const isFormDataInvalid = (
      validateName(formData.first_name)
      || validateLogin(formData.login)
      || validateEmail(formData.email)
      || validatePhone(formData.phone)
      || validatePassword(formData.password)
    );

    if (isFormDataInvalid) {
      return;
    }

    authApi.signUp(formData)
      .then(xhr => {
        if (xhr.status === 200) {
          router.go(SignIn.url);
        } else {
          const responseData = JSON.parse(xhr.responseText);
          const reason: string | undefined = responseData.reason;

          if (reason) {
            errorText.textContent = reason;
          } else {
            errorText.textContent = 'Неизвестная ошибка'
          }

          errorTextBlock.style.display = 'block';
        }

      });
  }

  public render(): HTMLElement {
    return this.compile(tpl);
  }
}
