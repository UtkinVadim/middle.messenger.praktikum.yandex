import tpl from './tpl.ts';
import Button from '../Button/index.ts';
import Block from '../../services/Block.ts';
import InputWithLabel from '../InputWithLabel/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenInputForm extends PropsAndChildren {
    formId: string;

    inputs: Array<InputWithLabel>;
    inputsContainerClass: string;

    submitButton: Button;
    submitContainerClass: string;

    onSubmit: (formData: any) => void;
}

export default class InputForm extends Block {
  constructor(propsAndChildren: IPropsAndChildrenInputForm, tagName: string = 'form') {
    const props = {
      ...propsAndChildren,
      attr: { id: propsAndChildren.formId },
      events: {
        submit(event: SubmitEvent) {
          event.preventDefault();
          event.stopPropagation();

          const form = event.target as HTMLFormElement;

          const formData: Record<string, string> = {};
          if (form) {
            for (let i = 0; i < form.length; i += 1) {
              const input = form.elements[i] as HTMLInputElement;
              if (input.name && input.value) {
                formData[input.name] = input.value;
              }
            }
          }

          propsAndChildren.onSubmit(formData);
        },
      },
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
