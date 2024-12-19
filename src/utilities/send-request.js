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


  const token = await getToken();
  if (token) {
    // Ensure that headers object exists
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }


  const cleanedUrl = url.replace(/^\/api/, '');
  const fullUrl = `${import.meta.env.VITE_API_URL}${cleanedUrl}`;

  const res = await fetch(fullUrl, options);
  if (res.ok) {
    return res.json();
  } else {
    // comment back in for debug
    // console.error('Error response:', await res.text()); 
    // throw new Error('Bad Request');
  }
}