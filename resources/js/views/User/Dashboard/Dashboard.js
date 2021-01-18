import React, { useState, useEffect, Component } from 'react'
import { CSVLink } from 'react-csv'
import { Redirect } from 'react-router-dom'

import Form from '../../../components/Form/Form';
import { User_Update, User_Delete } from '../../../api/User';
import { get, isSafeInteger } from 'lodash';
import { event } from 'jquery';

const DashBoard = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, SetError] = useState("");
    const [userUpdate, SetUserUpdate] = useState({});
    const [userCSV, SetUserCSV] = useState({});
    const [userDelete, setUserDelete] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);



    const checkAppState = () => {
        const AppState = JSON.parse(localStorage["appState"]);

        return {
            isLoggedIn: AppState.isLoggedIn,
            user: AppState.user,
            hasEmailVerified: AppState.hasEmailVerified
        };
    }
    const getUserInfo = (res, user = {}) => {
        console.log(res);
        if (Object.keys(user).length == 0) {
            if (res.data.succes) {
                const appState = {
                    isLoggedIn: false,
                    user: {},
                    hasEmailVerified: false
                };

                localStorage["appState"] = JSON.stringify(appState);
                setIsDeleted(true);
            } else {
                SetError(res.data.error);
            }
        } else {
            if (res.data.succes) {
                const appState = {
                    isLoggedIn: true,
                    user: {
                        id: user.id,
                        name: user.username,
                        email: user.email
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

    }

    const handleUpdate = () => {
        setShowForm(1);
    }

    const handleDelete = () => {
        setShowForm(2);
    }

    const handleUser = async (data) => {
        if (data.user != undefined && Object.keys(userUpdate).length == 0) {
            let user = {
                id: checkAppState().user.id,
                username: data.username,
                email: data.email,
                password: data.password
            }
            User_Update(getUserInfo, user);
            SetUserUpdate(user);
        } else if (!userDelete) {
            const AppState = JSON.parse(localStorage["appState"]);
            setUserDelete(true);
            User_Delete(getUserInfo, AppState.user.id);
            // isDeleted.succes ? () => { localStorage["appState"] = {}; location.reload; } : SetError(isDeleted.res.data.error);
        }
    }


    useEffect(() => {
        if (Object.keys(userCSV).length == 0) {
            const AppState = JSON.parse(localStorage["appState"]);
            const user = AppState.user;

            const headers = [
                { label: "Username", key: "name" },
                { label: "Email", key: "email" }
            ]

            const data = [
                { name: user.name, email: user.email }
            ]

            SetUserCSV({
                filename: `${user.name}.csv`,
                headers: headers,
                data: data
            });
        }
    });

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
                {Object.keys(userCSV).length !== 0 && <CSVLink data={userCSV.data} filename={userCSV.filename} headers={userCSV.headers} >
                    Get CSV file with your data
                </CSVLink>}
                <button onClick={handleDelete}>
                    Delete account
                </button>
            </div>
            {showForm == 1 && <Form
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
            {showForm == 2 &&
                <Form
                    // getErrors={getErrors(errors)}
                    handleUser={handleUser}
                    name="delete"
                    title="All your data will be removed. Are you sure you want to do this?"
                    inputs={[]}
                    button='Delete Account'
                    link={false}
                    linkTo={false}
                />}
            {isDeleted && <Redirect to="/logout" />}
        </div>

    )
}
export default DashBoard
