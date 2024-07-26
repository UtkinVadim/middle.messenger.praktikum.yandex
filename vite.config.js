import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'static'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                sign_in: resolve(__dirname, 'src/pages/sign_in/sign_in.html'),
                sign_up: resolve(__dirname, 'src/pages/sign_up/sign_up.html'),
                error404: resolve(__dirname, 'src/pages/errors/404.html'),
                error500: resolve(__dirname, 'src/pages/errors/500.html'),
                profile_settings: resolve(__dirname, 'src/pages/profile_settings/profile_settings.html'),
                change_password: resolve(__dirname, 'src/pages/profile_settings/change_password/change_password.html'),
                chat_list: resolve(__dirname, 'src/pages/chat_list/chat_list.html'),
                chat: resolve(__dirname, 'src/pages/chat/chat.html'),
            },
        },
    },

    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
        context: {
            chats: [
                {
                    companion: "Name",
                    lastMessages: ["You: Hi!", "- Hi!", "You: How are you?"],
                    newMessagesCount: 3
                },
                {
                    companion: "Name2",
                    lastMessages: ["You: Hi!", "- Hi!", "You: How are you?"],
                    newMessagesCount: 0
                },
            ]
        },
    })],
});
