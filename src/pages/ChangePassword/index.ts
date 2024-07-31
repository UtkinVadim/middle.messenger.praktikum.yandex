import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import Button from '../../components/Button';
import {PropsAndChildren} from '../../types/Block';
import InputForm from "../../components/InputForm";
import BackButton from "../../components/BackButton";
import Input from '../../components/InputWithLabel/Input';
import InputWithLabel from "../../components/InputWithLabel";
import {inputValidator, validatePassword} from '../../utils/validations';

export default class ChangePassword extends Block {
    constructor(tagName: string = 'main', propsAndChildren: PropsAndChildren = {}) {
        propsAndChildren = {
            ...propsAndChildren,
            inputForm: new InputForm('form', {
                formId: 'changePasswordForm',
                inputs: [
                    new InputWithLabel('div', {
                        label: 'Old password',
                        input: new Input('input', {
                            id: 'oldPassword',
                            inputType: 'password',
                            editable: false,
                            events: {
                                blur: inputValidator(validatePassword)
                            }
                        })
                    }),
                    new InputWithLabel('div', {
                        label: 'New password',
                        input: new Input('input', {
                            id: 'newPassword',
                            inputType: 'password',
                            editable: false,
                            events: {
                                blur: inputValidator(validatePassword)
                            }
                        })
                    }),
                    new InputWithLabel('div', {
                        label: 'New password (again)',
                        input: new Input('input', {
                            id: 'passwordConfirm',
                            inputType: 'password',
                            editable: false,
                            events: {
                                blur: inputValidator(validatePassword)
                            }
                        })

                    })
                ],
                inputsContainerClass: 'change_password__inputs',
                submitButton: new Button('button', {label: 'Save Up', type: 'submit'}),
                submitContainerClass: 'change_password__buttons'
            }),
            backButton: new BackButton(),
        }
        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
