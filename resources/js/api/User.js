import bcrypt from 'bcryptjs';
import { Redirect } from 'react-router-dom';



export const User_Registration = async (getUserInfo, user) => {

    window.axios.defaults.withCredentials = true;
    window.axios.get('sanctum/crf-cookie').then(async () => {

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;

                try {
                    const res = await window.axios({
                        method: 'post',
                        url: 'api/v1/auth/register',
                        data: {
                            username: user.username,
                            email: user.email,
                            password: user.password,
                        }
                    });

                    getUserInfo(res);

                } catch (error) {
                    console.log(error)
                    getUserInfo(error);
                }

            });
        });
    }).catch(err => console.log(err));


}

export const User_Login = async (getUserInfo, userLogin) => {
    window.axios.defaults.withCredentials = true;
    window.axios.get('sanctum/crf-cookie').then(async () => {

        try {
            console.log(userLogin);
            const res = await window.axios({
                method: 'post',
                url: 'api/v1/auth/login',
                data: {
                    username: userLogin.username_or_email,
                    password: userLogin.password,
                }
            });
            console.log(res);
            getUserInfo(res);

        } catch (error) {
            console.log(error)
        }

    }).catch(err => console.log(err));

}

export const User_Logout = async () => {
    try {
        const res = await window.axios({
            method: 'get',
            url: 'api/v1/auth/logout',
        });

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
            location.replace('./');
        } else {
            SetError(res.data.error);
            location.replace('./');
        }

    } catch (error) {
        location.replace('./');
    }
}






