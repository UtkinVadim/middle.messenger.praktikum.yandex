import Block from '../../services/Block';


export default class Nav extends Block{
    render() {
        console.log('Nav render');
        return this.compile('{{{items}}}');
    }
}
