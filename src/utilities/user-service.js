import * as userAPI from './user-api';

export async function register(userData) {
  // register a user
  const token = await userAPI.register(userData);
  saveToken(token.jwt);
  const user = getUser()
  return user;
}

export async function setRememberUser(data) {
  const response = await userAPI.rememberUser(data);
  if(response.message === 'Not remembered'){return}
  if(response.message === 'Token created successfully'){
    saveUserToken(response.token)
  }
  if(response.remove_token === true){
    removeUserToken();
  }
}

export async function grabRememberedUser() {
  const token = retrieveUserToken();
  if(token){
    const response = await userAPI.rememberUser({token: token, remember_me: true});
    if(response.message === 'Token validated successfully'){
      return(response.email);
    };
    if(response.remove_token === true){
      removeUserToken();
    }
  }else{return};
}

export async function removeRemeberedUser() {
  removeUserToken();
  return;
}

export async function getToken() {
  //grab token

  const token = localStorage.getItem('jwt');
  //validate token
  if (!token) return null;
  // pull token exp
  try {
    // Decode and parse the payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check the expiration time and validate
    if (payload.exp < Date.now() / 1000) {
      // If expired, remove the token and return null
      removeToken();
      return null;
    }

    // If valid, return the token
    return token;
  } catch (error) {
    // In case of any errors (malformed token, JSON parsing, etc.), clear the token
    removeToken();
    return null;
  }
}

export async function getUser() {
  // grab user from database
  try {
    const userData = await userAPI.grabUser();
    return userData;
  } catch (err) {
    return null;
  }
}

export async function logOut() {
  await userAPI.logOut();
  removeToken();
}

export async function login(credentials) {
  const token = await userAPI.login(credentials);
  saveToken(token.jwt);
  return getUser();
}

export async function adminVerify(){
  try {
    const adminStatus = await userAPI.adminVerify();
    return adminStatus;
  } catch (err) {
    return false;
  }
}

function saveToken(token) {
  localStorage.setItem('jwt', token);
}

function saveUserToken(token) {
  localStorage.setItem('remember_user', token);
}

function retrieveUserToken() {
  return localStorage.getItem('remember_user');
}

function removeUserToken() {
  localStorage.removeItem('remember_user');
}

function removeToken() {
  localStorage.removeItem('jwt');
}
