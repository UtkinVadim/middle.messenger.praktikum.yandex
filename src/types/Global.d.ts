import Block from "../services/Block.ts";

declare global {
    interface HTMLElement {
        content: any;
    }
}

declare global {
    interface Window {
        page: Block;
    }
}
