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
const chatProps = new Chat({
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
const navigationBlock = new Navigation(
  {
    items: [
      new Link({url: '/', title: 'Авторизация'}),
      new Link({url: '/', title: 'Регистрация'}),
      new Link({url: '/', title: 'Ошибка 404'}),
      new Link({url: '/', title: 'Ошибка 500'}),
      new Link({url: '/', title: 'Настройки пользователя'}),
      new Link({url: '/', title: 'Список чатов'}),
      new Link({url: '/', title: 'Лента переписки'}),
    ],
  }
);

const router = new Router('.app');
router
  .use(Navigation.url, navigationBlock)
  .use(SignIn.url, signIn)
  .start();

router.go('/navigation');

export default router;
