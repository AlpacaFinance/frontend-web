import axios from 'axios';

const apiUrl = 'https://alpacafinance.azurewebsites.net/api/v1/operacion';

export async function getHistoryByUser(idUser) {
    let operations = [];
    const response =  await axios.get(`${apiUrl}/${idUser}/usuario`);
    operations = response.data;
    return operations;
}