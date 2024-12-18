import { getToken } from './user-service';

export default async function sendRequest(url, method = 'GET', payload = null, queryParameters = {}) {

  if (Object.keys(queryParameters).length > 0) {
    const queryString = new URLSearchParams(queryParameters).toString();
    url = `${url}?${queryString}`;
  }

  const options = { method };


  if (payload) {
    if (payload instanceof FormData) {
      options.body = payload;
    } else {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  }


  const token = getToken();
  if (token) {
    // Ensure that headers object exists
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  console.log(url)
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}