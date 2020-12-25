import React, { useState, useEffect } from 'react'
import Form from '../../../components/Form/Form';
import { User_Update } from '../../../api/User';
const DashBoard = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, SetError] = useState("");
    const [userUpdate, SetUserUpdate] = useState({});

    const checkAppState = () => {
        const AppState = JSON.parse(localStorage["appState"]);
        return {
            isLoggedIn: AppState.isLoggedIn,
            user: AppState.user,
            hasEmailVerified: AppState.hasEmailVerified
        };
    }
    const getUserInfo = (res) => {
        console.log(res);
        if (res.data.succes) {
            const appState = {
                isLoggedIn: true,
                user: {
                    id: userUpdate.id,
                    name: userUpdate.username,
                    email: userUpdate.email
                },
                hasEmailVerified: checkAppState.hasEmailVerified
            };

            localStorage["appState"] = JSON.stringify(appState);
            location.reload();
        } else {
            SetError(res.data.error);
            SetUserUpdate({});
        }

    }

    const handleUpdate = () => {
        setShowForm(true);
    }

    const handleUser = (data) => {
        if (Object.keys(userUpdate).length == 0) {
            let user = {
                id: checkAppState().user.id,
                username: data.username,
                email: data.email,
                password: data.password
            }
            console.log(user);
            User_Update(getUserInfo, user);
            SetUserUpdate(user);
        }
    }


    return (
        <div className='form-container'>
            <div className='form-content-left'>
                {error && <p>{error}</p>}
                <table>
                    <tbody>
                        <tr>
                            <th scope="row ">Username</th>
                            <td>{checkAppState().user.name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Email</th>
                            <td>{checkAppState().user.email}</td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={handleUpdate}>
                    Update User Data
            </button>
            </div>
            {showForm && <Form
                handleUser={handleUser}
                name="update"
                title="Update User Data"
                inputs={[
                    { 'label': 'Username:', 'name': 'username', "type": 'text', 'value': checkAppState().user.name },
                    { 'label': 'Email:', 'name': 'email', "type": 'email', 'value': checkAppState().user.email },
                    { 'label': 'Password:', 'name': 'password', "type": 'password', 'placeholder': 'Enter your password' },
                    { 'label': 'Confirm Password:', 'name': 'confirm_password', "type": 'password', 'placeholder': 'Enter your password' }
                ]}
                button='Update'
                link={false}
                linkTo={false}

            />}
        </div>
    )
}
export default DashBoard
