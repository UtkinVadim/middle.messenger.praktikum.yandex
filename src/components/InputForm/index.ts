import tpl from './tpl';
import Button from '../Button';
import Block from '../../services/Block';
import InputWithLabel from '../InputWithLabel';
import { PropsAndChildren } from '../../types/Block';

interface IPropsAndChildrenInputForm extends PropsAndChildren {
    formId: string;

    inputs: Array<InputWithLabel>;
    inputsContainerClass: string;

    submitButton: Button;
    submitContainerClass: string;
}

export default class InputForm extends Block {
  constructor(tagName: string = 'form', propsAndChildren: IPropsAndChildrenInputForm) {
    propsAndChildren = {
      ...propsAndChildren,
      attr: { id: propsAndChildren.formId },
      events: {
        submit(event: SubmitEvent) {
          event.preventDefault();
          event.stopPropagation();

          const form = event.target as HTMLFormElement;

          const formData: Record<string, string> = {};
          if (form) {
            for (let i = 0; i < form.length; i++) {
              const input = form.elements[i] as HTMLInputElement;
              if (input.name && input.value) {
                formData[input.name] = input.value;
              }
            }
          }
        },
      },
    };

    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}
