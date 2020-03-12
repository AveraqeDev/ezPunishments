import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
    window.sessionStorage.setItem(config.USER_KEY, JSON.stringify(this.parseAuthToken()));
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

  parseAuthToken() {
    const base64Url = this.getAuthToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.user_id,
      username: payload.sub,
      role: payload.role
    }
  },

  clearUser() {
    window.sessionStorage.removeItem(config.USER_KEY);
  },

  isStaff() {
    const user = JSON.parse(window.sessionStorage.getItem(config.USER_KEY));
    return user && (user.role === 'staff' || user.role === 'admin');
  },

  isAdmin() {
    const user = JSON.parse(window.sessionStorage.getItem(config.USER_KEY));
    return user && (user.role === 'admin');
  }
};

export default TokenService;