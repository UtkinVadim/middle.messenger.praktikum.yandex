import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChangePassword from "../ChangePassword";
import {PropsAndChildren} from '../../types/Block';
import BackButton from "../../components/BackButton";


export default class ProfileSettings extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
        propsAndChildren = {
            ...propsAndChildren,
            backButton: new BackButton(),
            saveChangesButton: new Button('button', {
                label: 'Save changes',
                type: 'submit',
            }),
            changePasswordButton: new Button('button', {
                label: 'Change password',
                link: new ChangePassword(),
            }),
            inputs: [
                new Input('div', {
                    label: 'Email',
                    id: 'email',
                    editable: true,
                }),
                new Input('div', {
                    label: 'Login',
                    id: 'login',
                    editable: true,
                }),
                new Input('div', {
                    label: 'First name',
                    id: 'first_name',
                    editable: true,
                }),
                new Input('div', {
                    label: 'Second name',
                    id: 'second_name',
                    editable: true,
                }),
                new Input('div', {
                    label: 'Display name',
                    id: 'display_name',
                    editable: true,
                }),new Input('div', {
                    label: 'Phone',
                    id: 'phone',
                    editable: true,
                }),
            ],
        }

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
