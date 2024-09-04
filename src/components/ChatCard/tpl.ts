const tpl: string = `
{{{deleteChatButton}}}

<div class="chat_card__avatar">
    <img class="avatar" src="/empty_avatar.svg" alt="{{ companion }}">
</div>

{{#if unread_count}}
    <div class="chat_card__new_messages">
        <span class="chat_card__new_messages__count">+{{ unread_count }}</span>
    </div>
{{/if}}

<div class="chat_card__companion">
    {{{title}}}
</div>

<div class="chat_card__last_messages">
    {{{last_message}}}
</div>
`;

export default tpl;
