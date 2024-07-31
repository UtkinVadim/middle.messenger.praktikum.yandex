import Block from '../services/Block.ts';

declare global {
    interface HTMLElement {
        content: HTMLElement;
    }
}

declare global {
    interface Window {
        page: Block;
    }
}
