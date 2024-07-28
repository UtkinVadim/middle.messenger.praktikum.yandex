import Block from '../../services/Block';
import tpl from './tpl';


export default class Link extends Block{
    render() {
        return this.compile(tpl);
    }
}
