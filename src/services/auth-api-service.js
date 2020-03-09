import config from '../config';

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
  postPunishment(punishment) {
    return fetch(`${config.API_ENDPOINT}/punishments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(punishment)
    })
      .then(res => 
        (!res.ok)
          ? res.json.then(e => Promise.reject(e))
          : res.json()  
      );
  }
};

export default AuthApiService;