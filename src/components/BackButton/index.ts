import './style.scss';

import tpl from './tpl.ts';
import router from '../../index.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import * as readline from 'node:readline';

interface IPropsAndChildrenBackButton extends PropsAndChildren {
  backUrl?: string;
}

export default class BackButton extends Block {
  constructor(propsAndChildren: IPropsAndChildrenBackButton = {}, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'back-button';

    if (!props.events) {
      props.events = {};
    }
    props.events.click = function redirect(event: PointerEvent) {
      if (props.backUrl) {
        router.go(props.backUrl);
      } else {
        router.back();
      }
      event.preventDefault();
      event.stopPropagation();
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}
