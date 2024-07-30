const tpl: string = `
<div class="chat__header">
    <div class="chat__header__content">
        {{{backButton}}}

        <strong class="chat__header__content__name">Name</strong>

        <img class="chat__header__content__avatar" src="/empty_avatar.svg" alt="Name">
    </div>
</div>

<div class="chat__messages">
</div>

<div class="chat__footer">
    <hr class="chat__footer__content__delimiter">
    <div class="chat__footer__content">

        <div class="chat__footer__add_file">
            <img src="/clip.svg" alt="Add file">
        </div>

        <div class="chat__footer__input_message">
            <label for="message"></label>
            <input type="text" id="message" name="message" placeholder="Message...">
        </div>

        <div class="chat__footer__send_button">
            {{{sendButton}}}
        </div>
    </div>
</div>
`;

export default tpl;
