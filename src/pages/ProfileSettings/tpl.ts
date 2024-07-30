const tpl: string = `
{{{backButton}}}

<div class="profile_settings">
    <div class="profile_settings__avatar">
        <img src="/empty_avatar.svg" alt="Change avatar">
        <div class="profile_settings__avatar_overlay">Change avatar</div>
    </div>

    <div class="profile_settings__username">
        <strong>Name</strong>
    </div>

    {{{inputForm}}}

    <div class="profile_settings__buttons profile_settings__buttons__change_password">
        {{{changePasswordButton}}}
    </div>
</div>
`;

export default tpl;
