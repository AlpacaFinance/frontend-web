import axios from 'axios';

const apiUrl = 'https://alpacafinance.azurewebsites.net/api/v1/usuario';

export async function getProfileByUserId(idUser) {
    const response =  await axios.get(`${apiUrl}/${idUser}`);
    return response.data;
}

export async function getLogin(urlEmail, urlPassword) {
    const response =  await axios.get(
        `${apiUrl}/login?email=${urlEmail}&password=${urlPassword}`);
    return response;
}

export async function postUser(user) {
    let userData = null;
    const response = await axios.post(`${apiUrl}/register`, user);
    userData = response;
    return userData;
}