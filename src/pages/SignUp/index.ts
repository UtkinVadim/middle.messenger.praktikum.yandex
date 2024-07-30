import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {PropsAndChildren} from '../../types/Block';
import InputForm from "../../components/InputForm";

export default class SignUp extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
        propsAndChildren = {
            ...propsAndChildren,
            inputForm: new InputForm('form', {
                formId: 'signUpForm',
                inputs: [
                    new Input('div', {
                        label: 'First name',
                        id: 'first_name'
                    }),
                    new Input('div', {
                        label: 'Second name',
                        id: 'second_name'
                    }),
                    new Input('div', {
                        label: 'Login',
                        id: 'login'
                    }),
                    new Input('div', {
                        label: 'Email',
                        id: 'email'
                    }),
                    new Input('div', {
                        label: 'Password',
                        id: 'password'
                    }),
                    new Input('div', {
                        label: 'Phone',
                        id: 'phone'
                    }),
                ],
                inputsContainerClass: 'sign_up__inputs',
                submitButton: new Button('button', {label: 'Create profile', type: 'submit'}),
                submitContainerClass: 'sign_up__buttons'
            }),
        }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
