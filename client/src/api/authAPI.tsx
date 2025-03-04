import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok){
      const error = await response.text();
      throw new Error('Failed to log in: ' +error);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err: any) {
    console.error("Login error: " +err);
  }
}



export { login };
