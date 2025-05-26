import axios from 'axios';

const BASE_URL = 'https://erp.ayaanmr.com/urlapi/api/url/getapi';
const APIKEY = 'TESTKEYITM';
const UID = 'API';
const UPW = 'ba1234';

export async function fetchItemById(id) {
//   const randomP1 = Math.floor(Math.random() * 99999) + 1;
  const url = `${BASE_URL}?APIKEY=${APIKEY}&UID=${UID}&UPW=${UPW}` +
    `&P1=1&P2=${id}&P3=&P4=`;
  const { data } = await axios.get(url);
//   return Array.isArray(data) && data.length ? data[0] : null;
return Array.isArray(data) ? data : [];
}