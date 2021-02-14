const errorCodes: { [code: string]: string } = {
    'auth/email-already-in-use': 'An account already exists with the provided email!',
    'auth/invalid-email': 'Invalid Email!',
    'auth/weak-password': 'Weak Password! Kindly choose a strong password.',
    'auth/user-disabled': 'User disabled! Kinldy contact admin.',
    'auth/user-not-found': 'No User found with provided email!',
    'auth/wrong-password': 'Invalid Password!'
}

const ERROR_CODES = Object.freeze(errorCodes);

export default ERROR_CODES;

export const getErrorMessage = (errorCode: string): string => {
    return errorCodes[errorCode] ? errorCodes[errorCode] : 'Unknown Error!';
}