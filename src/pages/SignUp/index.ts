import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {PropsAndChildren} from '../../types/Block';

export default class SignUp extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
            propsAndChildren = {
                ...propsAndChildren,
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
                signUp: new Button('button', {label: 'Create profile', type: 'submit'})
            }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
