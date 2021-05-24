export const required = value => value ? '' : 'Please enter your';

export const duplicateCheck = (value, parentValue) => value === parentValue ? "" : 'Please enter the same';

export const validate = (name, value, user) => {
    let error = required(value);
    if (!error && (name === 'reUsername' || name === 'rePassword')) {
      error = duplicateCheck(value, name === 'reUsername' ? user.username.value : user.password.value);
    }
    return error;
}