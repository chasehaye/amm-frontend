import * as userAPI from './user-api';

export async function register(userData) {
  // register a user
   const token = await userAPI.register(userData);
  return getUser();
}

export async function getToken() {
  //grab token
  const token = getCookie('jwt');
  //validate token
  if (!token) return null;
  // pull token exp
  const payload = JSON.parse(atob(token.split('.')[1]));
  //validate exp
  if (payload.exp < Date.now() / 1000) {
    // if not valid remove token
    removeCookie('jwt');
    return null;
  }
  // if is valid return
  return token;
}

export async function getUser() {
  // grab user from database
  try {
    const userData = await userAPI.grabUser();
    return userData;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
}

export async function logOut() {
  removeCookie('jwt')
}

export async function login(credentials) {
  const token = await userAPI.login(credentials);
  return getUser();
}

export async function adminVerify(){
  try {
    const adminStatus = await userAPI.adminVerify();
    return adminStatus;
  } catch (err) {
    console.error('Error fetching user:', err);
    return false;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function removeCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}