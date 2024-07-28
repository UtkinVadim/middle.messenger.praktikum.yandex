import tpl from './tpl';
import Block from '../services/Block';


export default class IndexPage extends Block{
    render() {
        console.log('Page render');
        return this.compile(tpl);
    }
}
