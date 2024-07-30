const tpl: string = `
<label for="{{ id }}">{{ label }}</label>

{{#if editable}}
    <input class="editable-field"
           type='{{#if inputType}}{{inputType}}{{else}}text{{/if}}'
           id="{{ id }}"
           name="{{ id }}">
{{else}}
    <input type='{{#if inputType}}{{inputType}}{{else}}text{{/if}}'
           id="{{ id }}"
           name="{{ id }}">
{{/if}}
`;

export default tpl;
