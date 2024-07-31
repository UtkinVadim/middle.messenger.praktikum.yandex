export function validateName(name: string): string {
    const invalidMessage: string = '- Первая буква должна быть заглавной\n- Без пробелов и без цифр\n- Нет спецсимволов (допустим только дефис).'

    const regex: RegExp = /^[A-ZА-Я][A-ZА-Яa-zа-я-\s]*$/;
    const is_valid: boolean = regex.test(name);

    return is_valid ? '' : invalidMessage;
}

export function validateLogin(login: string): string {
    const invalidMessage: string = '- От 3 до 20 символов\n- Латиница\n- Может содержать цифры, но не состоять из них\n- Без пробелов и спецсимволов (допустимы дефис и нижнее подчёркивание).'

    const regex: RegExp = /^(?!.*[\s])(?!^\d*$)[a-zA-Z\d-_]{3,20}$/;
    const is_valid: boolean = regex.test(login);

    return is_valid ? '' : invalidMessage;
}

export function validateEmail(email: string): string {
    const invalidMessage: string = 'Неправильный email'

    const regex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const is_valid: boolean = regex.test(email);

    return is_valid ? '' : invalidMessage;
}

export function validatePassword(password: string): string {
    const invalidMessage: string = '- От 8 до 40 символов\n- Обязательно хотя бы одна заглавная буква и цифра'

    const regex: RegExp = /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d]{8,40}$/;
    const is_valid: boolean = regex.test(password);

    return is_valid ? '' : invalidMessage;
}

export function validatePhone(phone: string): string {
    const invalidMessage: string = 'Неправильный телефон'

    const regex: RegExp = /^(\+)?\d{10,15}$/;
    const is_valid: boolean = regex.test(phone);

    return is_valid ? '' : invalidMessage;
}


export function inputValidator(validateFunction: (input: string) => string) {
    return function (event: FocusEvent) {
        if (!event.target) {
            return;
        }

        const input: HTMLInputElement = event.target as HTMLInputElement;

        if (!input.value) {
            return;
        }

        const message: string = validateFunction(input.value);
        input.setCustomValidity(message);
    }
}
