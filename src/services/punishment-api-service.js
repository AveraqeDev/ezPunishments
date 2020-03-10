// import TokenService from './token-service';
import config from '../config';

const PunishmentApiService = {
  getPunishment(punishmentId) {
    return fetch(`${config.API_ENDPOINT}/punishments/${punishmentId}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  getPunishments() {
    return fetch(`${config.API_ENDPOINT}/punishments`)
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
        'Content-Type': 'application/json',
        'Authorization': 'application/json'
      },
      body: JSON.stringify(punishment)
    })
      .then(res => 
        (!res.ok)
          ? res.json.then(e => Promise.reject(e))
          : res.json()  
      );
  },
};

export default PunishmentApiService;