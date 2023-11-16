import axios from "axios";

export const userApi = {
  async isLoggedIn() {
    try {
      const response = await axios.get("http://localhost:3001/auth/login", {
        withCredentials: true,
      });
      console.log("isLoggedInisLoggedIn", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async logOut() {
    try {
      const response = await axios.post("http://localhost:3001/logout", {
        withCredentials: true,
      });
      console.log("logOut", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
