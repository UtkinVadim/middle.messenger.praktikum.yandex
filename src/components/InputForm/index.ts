import tpl from './tpl';
import Block from '../../services/Block';
import {PropsAndChildren} from '../../types/Block';
import Input from "../Input";
import Button from "../Button";


interface IPropsAndChildrenInputForm extends PropsAndChildren {
    formId: string;

    inputs: Array<Input>;
    inputsContainerClass: string;

    submitButton: Button;
    submitContainerClass: string;
}

export default class InputForm extends Block {
    constructor(tagName: string = 'form', propsAndChildren: IPropsAndChildrenInputForm) {
        propsAndChildren = {
            ...propsAndChildren,
            attr: {id: propsAndChildren.formId}
        }

        propsAndChildren.submitButton.setProps(
            {
                events: {
                    click: function (event: PointerEvent) {
                        event.preventDefault();
                        event.stopPropagation();

                        const form = (event.target as HTMLFormElement)?.form;
                        let formData: Record<string, string> = {};

                        if (form) {
                            for (let i = 0; i < form.length; i++) {
                                let input = form.elements[i] as HTMLInputElement;
                                if (input.name && input.value) {
                                    formData[input.name] = input.value;
                                }
                            }
                        }

                        console.log(formData);
                    }
                }
            }
        )

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
