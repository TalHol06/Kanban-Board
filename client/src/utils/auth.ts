import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token){
      return jwtDecode<JwtPayload>(token);
    } else{
      return null;
    }
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token){
      return this.isTokenExpired(token);
    } else{
      return false;
    }
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (!token){
      return true;
    } else{
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('id_token');
    if (token !== null){
      return token;
    } else{
      return 'No token assigned';
    }
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
