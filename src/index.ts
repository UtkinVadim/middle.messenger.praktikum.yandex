import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Link from "./components/Link";
import ErrorPage from "./pages/Error";
import IndexLayout from "./layout/Index";
import LastChats from "./pages/LastChats";
import Navigation from "./pages/Navigation";
import ChatCard from "./components/ChatCard";
import {default as renderDom} from './utils/render';
import ProfileSettings from "./pages/ProfileSettings";
import ChatCardMessage from "./components/ChatCard/Message";



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
const profileSettings = new ProfileSettings();

const lastChats = new LastChats('main', {
    chat_cards: [
        new ChatCard('div', {
            companion: "Имя",
            lastMessages: [
                new ChatCardMessage('p', {text: "Привет"}),
                new ChatCardMessage('p', {text: "Привет!"})
            ],
            newMessagesCount: 1
        }),
        new ChatCard('div', {
            companion: "Имя2",
            lastMessages: [],
            newMessagesCount: 0
        }),
    ]
});

const chat = new Chat();


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

            new Link('li', {
                url: '/',
                title: 'Настройки пользователя',
                contentPage: profileSettings,
            }),

            new Link('li', {
                url: '/',
                title: 'Список чатов',
                contentPage: lastChats,
            }),

            new Link('li', {
                url: '/',
                title: 'Лента переписки',
                contentPage: chat,
            }),

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
