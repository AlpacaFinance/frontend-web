import axios from 'axios';

const apiUrl = 'https://alpacafinance.azurewebsites.net/api/v1/divisa';

export async function getDivisaList() {
    let divisaList = [];
    const response =  await axios.get(`${apiUrl}`);
    divisaList = response.data;
    return divisaList;
}