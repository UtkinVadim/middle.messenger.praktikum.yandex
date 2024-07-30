import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {PropsAndChildren} from '../../types/Block';
import InputForm from "../../components/InputForm";


export default class SignIn extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {

        propsAndChildren = {
            ...propsAndChildren,
            inputForm: new InputForm('form', {
                formId: 'signInForm',
                inputs: [
                    new Input('div', {
                        label: 'Login',
                        id: 'login'
                    }),
                    new Input('div', {
                        label: 'Password',
                        id: 'password'
                    })
                ],
                inputsContainerClass: 'sign_in__inputs',
                submitButton: new Button('button', {label: 'Sign In', type: 'submit'}),
                submitContainerClass: 'sign_in__buttons'
            }),
            signUp: new Button('button', {label: 'Sign Up'})
        }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
