export function validateFieldOnChange(name, value) {
    switch (name) {
        case 'firstName':
        case 'lastName':
            return validateNameOnChange(value);
        case 'dateOfBirth':
            return validateDateOfBirthOnChange(value);
        case 'email':
            return validateEmailOnChange(value);
        default:
            break;
    }
    return '';
}

function validateNameOnChange(value) {
    if (value === '') {
        return '';
    }

    if (!/^[a-zA-Z]+$/.test(value)) {
        return 'Only Latin characters are allowed';
    }

    return '';
}

function validateDateOfBirthOnChange(value) {
    if (new Date(value) > new Date()) {
        return 'Invalid date';
    }

    return '';
}

function validateEmailOnChange(value) {
    if (value === '') {
        return '';
    }

    if (!/^\S+@\S+$/.test(value)) {
        return 'Invalid E-Mail';
    }

    return '';
}

export function validateFieldOnSubmission(name, value) {
    if (value === '') {
        return 'This is a required field';
    }
    else if (name === 'agreement' && !value) {
        return 'You should read the terms and rules';
    }

    return '';
}