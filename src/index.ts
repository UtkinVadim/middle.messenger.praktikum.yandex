import Chat from './pages/Chat/index.ts';
import Router from './services/Router.ts';
import SignIn from './pages/SignIn/index.ts';
import SignUp from './pages/SignUp/index.ts';
import Link from './components/Link/index.ts';
import ErrorPage from './pages/Error/index.ts';
import LastChats from './pages/LastChats/index.ts';
import Navigation from './pages/Navigation/index.ts';
import ChatCard from './components/ChatCard/index.ts';
import ChatMessage from './components/ChatMessage/index.ts';
import ProfileSettings from './pages/ProfileSettings/index.ts';
import ChatCardMessage from './components/ChatCard/Message/index.ts';
import ChangePassword from './pages/ChangePassword';

const signIn = new SignIn();
const signUp = new SignUp();
const error404 = new ErrorPage({
  error_code: '404',
  description: 'There\'s nothing here',
});
const error500 = new ErrorPage({
  error_code: '500',
  description: 'Something went wrong',
});
const changePassword = new ChangePassword();
const profileSettings = new ProfileSettings(changePassword);
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
const chat = new Chat({
  messages: [
    new ChatMessage({
      text: 'Hello',
      type: 'sent'
    }),
    new ChatMessage({
      text: 'Hi',
      type: 'received'
    }),
  ],
});

const navigation = new Navigation(
  {
    items: [
      new Link({
        url: signIn.url,
        title: 'Авторизация'
      }),
      new Link({
        url: signUp.url,
        title: 'Регистрация'
      }),
      new Link({
        url: error404.url,
        title: 'Ошибка 404'
      }),
      new Link({
        url: error500.url,
        title: 'Ошибка 500'
      }),
      new Link({
        url: profileSettings.url,
        title: 'Настройки пользователя'
      }),
      new Link({
        url: lastChats.url,
        title: 'Список чатов'
      }),
      new Link({
        url: chat.url,
        title: 'Лента переписки'
      }),
    ],
  }
);

const router = new Router('.app');
router
  .use(signIn.url, signIn)
  .use(signUp.url, signUp)
  .use(error404.url, error404)
  .use(error500.url, error500)
  .use(changePassword.url, changePassword)
  .use(profileSettings.url, profileSettings)
  .use(lastChats.url, lastChats)
  .use(chat.url, chat)
  .use(navigation.url, navigation)
  .start();

if (localStorage.getItem('isFirstLaunch') === null) {
  localStorage.setItem('isFirstLaunch', 'false');
  router.go('/navigation');
}

export default router;
