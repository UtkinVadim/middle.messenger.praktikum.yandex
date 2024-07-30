declare global {
    interface HTMLElement {
        content: any;
    }
}

export type PropsAndChildren = Record<string, Block | Array<any> | any>;
