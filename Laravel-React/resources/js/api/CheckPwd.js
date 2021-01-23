import { pwnedPassword } from 'hibp';

export const CheckPwd = async (password) => {

    const num = await pwnedPassword(`${password}`)
        .then(numPwns => {
            console.log(numPwns);
            return numPwns
        })
        .catch(err => {
            console.log(err);
        });
    return { num };
}
