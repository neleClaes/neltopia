import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { User_Logout } from '../../../api/User'

const Lougout = () => {
    const [isLoggedOut, SetIsLoggedOut] = useState(false);
    const [error, SetError] = useState("");
    useEffect(() => {
        const res = User_Logout();
        if (res.data.succes) {
            const appState = {
                isLoggedIn: false,
                user: {
                    id: '',
                    name: '',
                    email: ''
                },
                hasEmailVerified: false
            };

            localStorage["appState"] = JSON.stringify(appState);

            SetIsLoggedOut(true)
        } else {
            SetError(res.data.error);
        }
    });


    return (
        <div className="logout">
            <h1>Log out</h1>
            {error && <p>{error}</p>}
            {isLoggedOut && <Redirect to="/" message="blub" />}
        </div>
    )
}

export default Lougout
