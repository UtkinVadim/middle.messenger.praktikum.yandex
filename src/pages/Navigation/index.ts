import Block from '../../services/Block';


export default class Navigation extends Block{
    render() {
        return this.compile('{{{items}}}');
    }
}
