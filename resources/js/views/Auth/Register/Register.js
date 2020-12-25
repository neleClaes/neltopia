import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../../../css/SignUp.css';
import Form from '../../../components/Form/Form';
import { User_Registration } from '../../../api/User'

function Register() {
    const [isRegisterd, setIsRegister] = useState(false);
    const [error, SetError] = useState("");
    const [userRegistration, SetUserRegistration] = useState({})

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
                hasEmailVerified: false
            };

            localStorage["appState"] = JSON.stringify(appState);

            setIsRegister(true)
        } else {
            SetError(res.data.error);
        }

    }

    useEffect(() => {
        if (!Object.keys(userRegistration).length == 0) {
            User_Registration(getUserInfo, userRegistration);
        }
    });

    const handleUser = (data) => {
        console.log(data);
        SetUserRegistration(data);
    }


    return (
        <>
            <div className='form-container'>
                <div className='form-content-left'>
                    {/* <img className='form-img' src='img/img-2.svg' alt='spaceship' /> */}
                    {error && <p>{error}</p>}
                </div>
                <Form
                    // getErrors={getErrors(errors)}
                    handleUser={handleUser}
                    name="registration"
                    title="Get started with us today! Create your account by filling out the information below."
                    inputs={[
                        { 'label': 'Username:', 'name': 'username', "type": 'text', 'placeholder': 'Enter your username' },
                        { 'label': 'Email', 'name': 'email', "type": 'email', 'placeholder': 'Enter your email' },
                        { 'label': 'Password:', 'name': 'password', "type": 'password', 'placeholder': 'Enter your password' },
                        { 'label': 'Confirm Password:', 'name': 'confirm_password', "type": 'password', 'placeholder': 'Enter your password' }
                    ]}
                    button='Sign Up'
                    link='Do not have an account? Sign up'
                    linkTo="/login"
                />
                {isRegisterd && <Redirect to="/" message="blub" />}
            </div>
        </>
    )
}

export default Register;
