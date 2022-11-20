import axios from 'axios';

const apiUrl = 'https://alpacafinance.azurewebsites.net/api/v1/';

export async function getRateTypeList() {
    let rateTypeList = [];
    const response =  await axios.get(`${apiUrl}/usuarios/${id}/operations`);
    rateTypeList = response.data;
    return rateTypeList;
}