import Chat from './pages/Chat/index.ts';
import renderDom from './utils/render.ts';
import SignIn from './pages/SignIn/index.ts';
import SignUp from './pages/SignUp/index.ts';
import Link from './components/Link/index.ts';
import ErrorPage from './pages/Error/index.ts';
import IndexLayout from './layout/Index/index.ts';
import LastChats from './pages/LastChats/index.ts';
import Navigation from './pages/Navigation/index.ts';
import ChatCard from './components/ChatCard/index.ts';
import ChatMessage from './components/ChatMessage/index.ts';
import ProfileSettings from './pages/ProfileSettings/index.ts';
import ChatCardMessage from './components/ChatCard/Message/index.ts';

const signIn = new SignIn('main');
const signUp = new SignUp('main');
const error404 = new ErrorPage({
  error_code: '404',
  description: "There's nothing here",
});
const error500 = new ErrorPage({
  error_code: '500',
  description: 'Something went wrong',
});
const profileSettings = new ProfileSettings();

const lastChats = new LastChats({
  chat_cards: [
    new ChatCard({
      companion: 'Имя',
      lastMessages: [
        new ChatCardMessage({ text: 'Привет' }),
        new ChatCardMessage({ text: 'Привет!' }),
      ],
      newMessagesCount: 1,
    }),
    new ChatCard({
      companion: 'Имя2',
      lastMessages: [],
      newMessagesCount: 0,
    }),
  ],
});

const chat = new Chat('div', {
  messages: [
    new ChatMessage({ text: 'Hello', type: 'sent' }),
    new ChatMessage({ text: 'Hi', type: 'received' }),
  ],
});

const navigation = new Navigation(
  'ul',
  {
    items: [
      new Link({
        url: '/',
        title: 'Авторизация',
        contentPage: signIn,
      }),

      new Link({
        url: '/',
        title: 'Регистрация',
        contentPage: signUp,
      }),

      new Link({
        url: '/',
        title: 'Ошибка 404',
        contentPage: error404,
      }),

      new Link({
        url: '/',
        title: 'Ошибка 500',
        contentPage: error500,
      }),

      new Link({
        url: '/',
        title: 'Настройки пользователя',
        contentPage: profileSettings,
      }),

      new Link({
        url: '/',
        title: 'Список чатов',
        contentPage: lastChats,
      }),

      new Link({
        url: '/',
        title: 'Лента переписки',
        contentPage: chat,
      }),

    ],
  },
);

const page = new IndexLayout(
  {
    content: navigation,
    attr: {
      class: 'content',
    },
  },
);

window.page = page;

renderDom('.app', page);
