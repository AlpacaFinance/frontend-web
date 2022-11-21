import axios from 'axios';

const apiUrl = 'https://alpacafinance.azurewebsites.net/api/v1/ratetype';

export async function getRateTypeList() {
    let rateTypeList = [];
    const response =  await axios.get(`${apiUrl}`);
    rateTypeList = response.data;
    return rateTypeList;
}