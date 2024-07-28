import tpl from './tpl';
import Nav from '../../components/Nav';
import Block from '../../services/Block';


export default class Index extends Block {
    render() {
        console.log('Layout render');
        return this.compile(tpl);
    }

    // constructor(tagName = 'div', props = {}) {
    //     props['nav'] = new Nav(
    //         'div',
    //         {
    //             items: [
    //                 {url: '/', title: 'Главная'},
    //                 {url: '/form', title: 'Формой'},
    //             ],
    //             events: {
    //                 click: e => {
    //                     console.log('Nav link clicked');
    //
    //                     if (e.target && e.target.getAttribute('href')) {
    //                         console.log('Nav link clicked');
    //                         e.preventDefault();
    //                         e.stopPropagation();
    //                     } else {
    //                         console.log('No link clicked');
    //                     }
    //                 }
    //             }
    //         }
    //     );
    //
    //     super(tagName, props);
    // }
}
