import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';

import Form from '../../../components/Form/Form'
import { User_Login } from '../../../api/User';

import '../../../../css/Form.css'

const Login = () => {

    const [isLoggedInTemp, SetIsLoggedIn] = useState(false);
    const [error, SetError] = useState("");
    const [userLogin, SetUserLogin] = useState({})

    const getUserInfo = (res) => {
        console.log(res);
        if (res.data.succes) {
            const appState = {
                isLoggedIn: true,
                user: {
                    id: res.data.user.id,
                    name: res.data.user.name,
                    email: res.data.user.email
                },
                hasEmailVerified: !(res.data.user.email_verified_at === null) ? true : false
            };

            localStorage["appState"] = JSON.stringify(appState);

            SetIsLoggedIn(true)
        } else {
            SetError(res.data.error);
        }

    }

    useEffect(() => {
        if (!Object.keys(userLogin).length == 0) {
            console.log(userLogin);
            User_Login(getUserInfo, userLogin);
        }
    });

    const handleUser = (data) => {
        console.log(data);
        SetUserLogin(data);
    }

    return (
        <div className="login">
            <div className='form-container'>
                <div className='form-content-left'>
                    {/* <Errors errors={Errors} /> */}
                    {error && <p>{error}</p>}
                </div>
                <Form
                    // getErrors={getErrors(errors)}
                    handleUser={handleUser}
                    name="login"
                    title="Login"
                    inputs={[
                        { 'label': 'Username or Email:', 'name': 'username_or_email', "type": 'text', 'placeholder': 'Enter your username/email' },
                        { 'label': 'Password:', 'name': 'password', "type": 'password', 'placeholder': 'Enter your password' },
                    ]}
                    button='Login'
                    link='Do not have an account? Sign up'
                    linkTo="/register"
                />
            </div>
            {isLoggedInTemp && <Redirect to="/" message="blub" />}
        </div>
    )
}

export default Login;
