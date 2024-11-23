import Block from '../services/Block.ts';

declare global {
    interface Window {
        page: Block;
    }
}
