import {default as renderDom} from './utils/render';
import IndexLayout from './layout/Index';
import Nav from './components/Nav';
import Link from './components/Link';
import Page from './pages';

const nav = new Nav(
    'ul',
    {
        items: [
            new Link('li', {
                url: '/',
                title: 'Главная',
                events: {
                    click: e => {
                        console.log('Main link clicked');
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }),
            new Link('li', {
                url: '/form',
                title: 'Формой',
                events: {
                    click: e => {
                        console.log('Form link clicked');
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }),
        ],


    }
);

const content = new Page(
    'div',
    {
        text: 'Некий текст содержимого страницы',
    }
);

const page = new IndexLayout(
    'div',
    {
        nav: nav,
        title: 'Заголовок',
        content: content,
        attr: {
            class: 'page',
        }
    }
);

window.page = page;
window.content = content;
window.changePageContent = () => {

    let newContent = new Page(
        'div',
        {
            text: 'Какой-то другой текст',
        }
    );

    page.setProps({content: newContent});
};

renderDom('.app', page);
