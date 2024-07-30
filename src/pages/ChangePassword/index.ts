import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {PropsAndChildren} from '../../types/Block';
import BackButton from "../../components/BackButton";

export default class ChangePassword extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
        propsAndChildren = {
            ...propsAndChildren,
            inputs: [
                new Input('div', {
                    label: 'Old password',
                    id: 'oldPassword',
                    inputType: 'password',
                }),
                new Input('div', {
                    label: 'New password',
                    id: 'newPassword',
                    inputType: 'password',
                }),
                new Input('div', {
                    label: 'New password (again)',
                    id: 'passwordConfirm',
                    inputType: 'password',
                })
            ],
            saveButton: new Button('button', {label: 'Save Up', type: 'submit'}),
            backButton: new BackButton(),
        }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
