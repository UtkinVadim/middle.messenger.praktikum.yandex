import Block from '../services/Block.ts';

export default function renderDom(query: string, component: Block): Element | null {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';
    root.appendChild(component.getContent());
  }

  component.dispatchComponentDidMount();

  return root;
}
