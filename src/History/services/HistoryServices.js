import axios from 'axios';

const apiUrl = 'https://alpacafinance.azurewebsites.net/api/v1/';

export async function getHistoryByUser(idUser, history) {
    let operations = [];
    const response =  await axios.get(`${apiUrl}/usuarios/${id}/operations`);
    operations = response.data;
    return operations;
}