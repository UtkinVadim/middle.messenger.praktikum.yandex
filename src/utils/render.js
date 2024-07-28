export default function render(query, component) {
    const root = document.querySelector(query);

    if (root) {
        console.log("IsRoot")
        root.appendChild(component.getContent());
    }

    component.dispatchComponentDidMount();

    return root;
}
