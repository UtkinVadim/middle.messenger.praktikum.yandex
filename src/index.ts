import Link from "./components/Link";
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import IndexLayout from "./layout/Index";
import Navigation from "./pages/Navigation";
import {default as renderDom} from './utils/render';


const signIn = new SignIn('main');
const signUp = new SignUp('main');

const navigation = new Navigation(
    'ul',
    {
        items: [
            new Link('li', {
                url: '/',
                title: 'Авторизация',
                contentPage: signIn,
                events: {
                    click: function (e: PointerEvent): void {
                        page.setProps({content: signIn});
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }),

            new Link('li', {
                url: '/',
                title: 'Регистрация',
                contentPage: signUp,
                events: {
                    click: function (e: PointerEvent): void {
                        page.setProps({content: signUp});
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }),

            // new Link('li', {url: '/pages/errors/404.html', title: 'Ошибка 404'}),
            // new Link('li', {url: '/pages/errors/500.html', title: 'Ошибка 500'}),
            // new Link('li', {url: '/pages/profile_settings/profile_settings.html', title: 'Настройки пользователя'}),
            // new Link('li', {url: '/pages/chat_list/chat_list.html', title: 'Список чатов'}),
            // new Link('li', {url: '/pages/chat/chat.html', title: 'Лента переписки'}),
        ],
    }
);

const page = new IndexLayout(
    'div',
    {
        content: navigation,
        attr: {
            class: 'content'
        }
    }
);


renderDom('.app', page);
