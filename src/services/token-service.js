import config from '../config';

let _timeoudId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  parseAuthToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.user_id,
      username: payload.sub,
      role: payload.role,
      exp: payload.exp
    }
  },

  _getMsUntilExpiry(payload) {
    /*
      payload is from the JWT
      the `exp` value is in seconds, need to convert to ms, so * 1000
      calculates the difference between now and when the JWT will expire
    */
    return (payload.exp * 1000) - Date.now();
  },

  queueCallbackBeforeExpiry(callback) {
    // get the number of ms from now until the token expires
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken(TokenService.getAuthToken())
    );

    /*
      queue a callback that will happen 10 seconds before the token expires
      the callback is passed in as an argument so could be anything,
        in this app, the callback is for calling the refresh endpoint
    */
    _timeoudId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },

  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoudId);
  }
};

export default TokenService;