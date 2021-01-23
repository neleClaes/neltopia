import { CheckPwd } from '../../api/CheckPwd'


export default async function validateInfo(name, values) {
    let errors = {};

    if (name == "registration" || name == "update") {
        if (!values.username.trim()) {
            errors.username = 'Username required';
        } else if (!/^[A-Za-z0-9]+$/.test(values.username.trim())) {
            errors.username = 'Username can only contain numbers and letters';
        } else if (values.username.length > 20) {
            errors.username = 'Max size of username is 20 characters';
        }

        if (!values.email) {
            errors.email = 'Email required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        } else if (values.email.length > 40) {
            errors.email = 'Max size of email is 30 characters';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 7) {
            errors.password = 'Password needs to be 7 characters or more';
        } else if (!/^[\x00-\x7F]*$/.test(values.password)) {
            errors.password = 'Password can only excist ou printable ASCII characters';
        } else {
            const data = await CheckPwd(values.password);
            if (data.num > 300) {
                errors.password = `Password is already used to much! It was ${data.num} times in a breach. give another password`;
            }
        }

        if (!values.confirm_password) {
            errors.confirm_password = 'Password is required';
        } else if (values.confirm_password !== values.password) {
            errors.confirm_password = 'Passwords do not match';
        }
        // if (Object.keys(errors).length == 0) {
        //     const res = await Registration(values);
        //     await getUserData(res);
        // }
    }
    else if (name == "login") {

        if (!values.username_or_email.trim()) {
            errors.username_or_email = 'Username or Email required!'
        }
        if (!values.password.trim()) {
            errors.password = 'Password is required';
        }

        // if (Object.keys(errors).length == 0) {
        //     const res = await Login(values);
        //     await getUserData(res);
        // }
    }

    return errors;


}
