import Block from "../services/Block.ts";


export default function render(query: string, component: Block): Element | null {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(component.getContent());
    }

    component.dispatchComponentDidMount();

    return root;
}
