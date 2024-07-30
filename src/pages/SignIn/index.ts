import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {PropsAndChildren} from '../../types/Block';

export default class SignIn extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
            propsAndChildren = {
                ...propsAndChildren,
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
                signIn: new Button('button', {label: 'Sign In', type: 'submit'}),
                signUp: new Button('button', {label: 'Sign Up', type: 'submit'})
            }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
