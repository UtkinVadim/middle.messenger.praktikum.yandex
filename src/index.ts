import Link from "./components/Link";
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import ErrorPage from "./pages/Error";
import IndexLayout from "./layout/Index";
import Navigation from "./pages/Navigation";
import {default as renderDom} from './utils/render';


const signIn = new SignIn('main');
const signUp = new SignUp('main');
const error404 = new ErrorPage('main', {
    error_code: '404',
    description: "There's nothing here"
});
const error500 = new ErrorPage('main', {
    error_code: '500',
    description: 'Something went wrong'
});

const navigation = new Navigation(
    'ul',
    {
        items: [
            new Link('li', {
                url: '/',
                title: 'Авторизация',
                contentPage: signIn,
            }),

            new Link('li', {
                url: '/',
                title: 'Регистрация',
                contentPage: signUp,
            }),

            new Link('li', {
                url: '/',
                title: 'Ошибка 404',
                contentPage: error404,
            }),

            new Link('li', {
                url: '/',
                title: 'Ошибка 500',
                contentPage: error500,
            }),

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

window.page = page;


renderDom('.app', page);
