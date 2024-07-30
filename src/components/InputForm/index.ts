import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';
import Input from "../Input";
import Button from "../Button";

interface IPropsAndChildrenInputForm extends
    PropsAndChildren {
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

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
