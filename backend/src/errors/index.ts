function conflictError(message: string[]) {
    return {
        name: "ConflictError",
        message,
    };
}

export function invalidDataError(details: string[]) {
    return {
        name: 'InvalidDataError',
        message: 'Invalid data',
        details,
    };
}

function duplicatedTitleError(title: string) {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given email",
        title,
    };
}

function duplicatedError() {
    return {
        name: "DuplicatedGameError",
        message: "There is already an user with given title and release date",
    };
}

function duplicatedEmailError() {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given title and release date",
    };
}

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must be signed in to continue",
    };
}

function notFoundError() {
    return {
        name: "NotFoundError",
        message: "No result for this search!",
    };
}

function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect",
    };
}

export default {
    conflictError,
    duplicatedTitleError,
    unauthorizedError,
    notFoundError,
    invalidCredentialsError,
    duplicatedError,
    invalidDataError,
    duplicatedEmailError
};