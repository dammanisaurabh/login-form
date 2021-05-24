import { errorMessages } from './constants';

const { requiredDetails, duplicate } = errorMessages;

export const required = value => value ? '' : requiredDetails;

export const duplicateCheck = (value, parentValue) => value === parentValue ? "" : duplicate;

export const validate = (name, value, user) => {
    let error = required(value);
    if (!error && (name === 'reUsername' || name === 'rePassword')) {
      error = duplicateCheck(value, name === 'reUsername' ? user.username.value : user.password.value);
    }
    return error;
}