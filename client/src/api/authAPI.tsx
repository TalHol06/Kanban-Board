import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo);
    });

    if (!response.ok){
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    if (data.token){
      localStorage.setItem('id_token', data.token);
      window.location.assign('/');
    }
  } catch (err: any) {
    console.error("Login error: " +err);
  }
}



export { login };
