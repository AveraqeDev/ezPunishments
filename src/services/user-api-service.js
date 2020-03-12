import config from '../config';

const UserApiService = {
  getAllUsers() {
    return fetch(`${config.API_ENDPOINT}/users`)
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },

  getById(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`)
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  updateUser(id, newUserFields) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserFields)
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.statusText  
      );
  }
};

export default UserApiService;