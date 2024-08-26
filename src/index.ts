import Chat from './pages/Chat/index.ts';
import Router from './services/Router.ts';
import SignIn from './pages/SignIn/index.ts';
import SignUp from './pages/SignUp/index.ts';
import ErrorPage from './pages/Error/index.ts';
import LastChats from './pages/LastChats/index.ts';
import ChatMessage from './components/ChatMessage/index.ts';
import ProfileSettings from './pages/ProfileSettings/index.ts';
import ChangePassword from './pages/ChangePassword';

const signUp = new SignUp();
const signIn = new SignIn(signUp);
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
const lastChats = new LastChats();
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


const router = new Router('.app');
router
  .use(SignIn.url, signIn)
  .use(SignUp.url, signUp)
  .use(error404.url, error404)
  .use(error500.url, error500)
  .use(ChangePassword.url, changePassword)
  .use(ProfileSettings.url, profileSettings)
  .use(LastChats.url, lastChats)
  .use(Chat.url, chat)
  .start();


export default router;
