import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import {PropsAndChildren} from '../../types/Block';
import BackButton from "../../components/BackButton";

interface IPropsAndChildrenError extends
    PropsAndChildren {
    error_code: string;
    description: string;
    back_button?: Block;
}

export default class Error extends Block {
    constructor(tagName: string = 'main', propsAndChildren: IPropsAndChildrenError) {
        propsAndChildren.back_button = new BackButton();

        super(tagName, propsAndChildren);
    }

    render() {
        return this.compile(tpl);
    }
}
