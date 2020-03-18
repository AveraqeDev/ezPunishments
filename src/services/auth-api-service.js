import config from '../config';
import TokenService from './token-service';

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  postLogin({user_name, password}) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_name, password })
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      );
  },

  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer: ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        });
        return res;
      })
      .catch(err => {
        console.log('refresh token request error');
        console.error(err);
      });
  }
};

export default AuthApiService;