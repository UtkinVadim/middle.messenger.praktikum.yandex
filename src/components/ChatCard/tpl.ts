const tpl: string = `
<div class="chat_card__avatar">
    <img class="avatar" src="/empty_avatar.svg" alt="{{ companion }}">
</div>

{{#if newMessagesCount}}
    <div class="chat_card__new_messages">
        <span class="chat_card__new_messages__count">+{{ newMessagesCount }}</span>
    </div>
{{/if}}

<div class="chat_card__companion">
    {{{companion}}}
</div>

<div class="chat_card__last_messages">
    {{{lastMessages}}}
</div>
`;

export default tpl;
