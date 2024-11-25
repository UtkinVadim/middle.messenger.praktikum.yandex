import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import BackButton from '../../components/BackButton/index.ts';

interface IPropsAndChildrenError extends
    PropsAndChildren {
    error_code: string;
    description: string;
    back_button?: Block;
}

export default class Error extends Block {
  public url: string;

  constructor(propsAndChildren: IPropsAndChildrenError, tagName: string = 'main') {
    const props = { ...propsAndChildren };
    props.back_button = new BackButton();

    super(tagName, props);

    this.url = `/error/${propsAndChildren.error_code}`;
  }

  render() {
    return this.compile(tpl);
  }
}
