const tpl: string = `
<div class="sign_in">
    <h3 class="sign_in__header_text">Super messenger</h3>

    <form>
        <div class="sign_in__inputs">
            {{{inputs}}}
        </div>
        <div class="sign_in__buttons">
            {{{signIn}}}
        </div>
    </form>

    <div class="sign_in__buttons sign_in__buttons__sign_up">
        {{{signUp}}}
    </div>

</div>
`

export default tpl;
