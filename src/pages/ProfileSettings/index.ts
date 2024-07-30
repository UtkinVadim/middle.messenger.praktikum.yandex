import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Input from "../../components/Input";
import Button from "../../components/Button";
import ChangePassword from "../ChangePassword";
import {PropsAndChildren} from '../../types/Block';
import InputForm from "../../components/InputForm";
import BackButton from "../../components/BackButton";


export default class ProfileSettings extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
        propsAndChildren = {
            ...propsAndChildren,
            backButton: new BackButton(),
            changePasswordButton: new Button('button', {
                label: 'Change password',
                link: new ChangePassword(),
            }),
            inputForm: new InputForm('form', {
                formId: 'profileSettingsForm',
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
                    }), new Input('div', {
                        label: 'Phone',
                        id: 'phone',
                        editable: true,
                    }),
                ],
                inputsContainerClass: 'profile_settings__inputs',
                submitButton: new Button('button', {
                    label: 'Save changes',
                    type: 'submit',
                }),
                submitContainerClass: 'profile_settings__buttons profile_settings__buttons__submit_button'
            }),
        }

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
