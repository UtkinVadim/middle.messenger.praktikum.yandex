export function validateName(name: string): boolean {
    const regex = /^[A-ZА-Я][A-ZА-Яa-zа-я-\s]*$/;
    return regex.test(name);
}

export function validateLogin(login: string): boolean {
    const regex = /^(?!.*[\s])(?!^\d*$)[a-zA-Z\d-_]{3,20}$/;
    return regex.test(login);
}

export function validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

export function validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d]{8,40}$/;
    return regex.test(password);
}

export function validatePhone(phone: string): boolean {
    const regex = /^(\+)?\d{10,15}$/;
    return regex.test(phone);
}


export function inputValidator(validateFunction: (input: string) => boolean) {
    return function (event: FocusEvent) {
        if (!event.target) {
            return;
        }

        const input: HTMLInputElement = event.target as HTMLInputElement;

        if (!input.value) {
            return;
        }

        const is_valid = validateFunction(input.value);

        if (!is_valid) {
            input.setCustomValidity('Wrong value');
        } else {
            input.setCustomValidity('');
        }
    }
}
