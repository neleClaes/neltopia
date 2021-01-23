import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { throttle, debounce } from 'lodash';

import Form from '../../../components/Form/Form'
import { User_Login } from '../../../api/User';

import '../../../../css/Form.css'

const Login = () => {

    const [isLoggedInTemp, SetIsLoggedIn] = useState(false);
    const [error, SetError] = useState("");
    const [userLogin, SetUserLogin] = useState({});
    const [loginAttempt, setLoginAttempt] = useState(0);
    const [formActive, setfromActive] = useState(true);

    const emailIsVerified = (res) => {
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

        SetIsLoggedIn(true);
    }

    const emailNotVerified = () => {
        SetError("verify your email!");
    }

    const formActivation = () => {
        console.log('test');
        setfromActive(true);
        location.reload();
    }

    const getUserInfo = (res) => {
        console.log(res);
        if (res.data.succes) {
            res.data.user.email_verified_at === null ? emailNotVerified : emailIsVerified(res);
        } else {
            SetError(res.data.error);
            console.log(loginAttempt);
            if (loginAttempt % 3 === 0 && loginAttempt >= 3) {
                setfromActive(false);
                debounce(formActivation, loginAttempt * 100);
            };
        }

    }

    const handleUser = (data) => {
        if (data !== userLogin) {
            console.log(data);
            User_Login(getUserInfo, data);
            SetUserLogin(data);
            setLoginAttempt(loginAttempt + 1);
            console.log(loginAttempt);
        }
    }

    return (
        <div className="login">
            <div className='form-container'>
                <div className='form-content-left'>
                    {/* <Errors errors={Errors} /> */}
                    {error && <p>{error}</p>}
                </div>
                {formActive && <Form
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
                />}
            </div>
            {isLoggedInTemp && <Redirect to="/" message="blub" />}
        </div>
    )
}

export default Login;
