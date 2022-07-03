import router from "@/router";
import { login, logout } from "@/utils/auth";
import axios from "axios";
import { api, appUrl } from "./api";
import Cookies from "js-cookie";

export default {
  //   async login(payload) {
  //     await authClient.get("/sanctum/csrf-cookie");
  //     return authClient.post("/login", payload);
  //   },
  //   logout() {
  //     return authClient.post("/logout");
  //   },
  //   async forgotPassword(payload) {
  //     await authClient.get("/sanctum/csrf-cookie");
  //     return authClient.post("/forgot-password", payload);
  //   },
  //   getAuthUser() {
  //     return authClient.get("/api/users/auth");
  //   },
  //   async resetPassword(payload) {
  //     await authClient.get("/sanctum/csrf-cookie");
  //     return authClient.post("/reset-password", payload);
  //   },
  //   updatePassword(payload) {
  //     return authClient.put("/user/password", payload);
  //   },
  async getCsrfToken(): Promise<String> {
    let token = Cookies.get("XSRF-TOKEN");
    if (token !== undefined)
      return new Promise<string>((resolve, reject) => {
        resolve(token as string);
      });
    await api.get(`${appUrl}/sanctum/csrf-cookie`);
    return Cookies.get("XSRF-TOKEN") as String;
  },
  async registerUser(data: unknown): Promise<void> {
    await this.getCsrfToken();
    const res = await api.post(`${appUrl}/api/register`, data);
    login(res.data);
  },

  async LoginUser(data: unknown): Promise<void> {
    try {
      await this.getCsrfToken();
      const res = await api.post(`${appUrl}/api/login`, data);
      login(res.data);
    } catch (error) {}
  },

  async LogoutUser(): Promise<void> {
    // await authClient.get("/sanctum/csrf-cookie");
    await api.post(`${appUrl}/api/logout`);
    logout();
    router.push({ name: "Login" });
  },
  //   async registerUser(payload) {
  //     return authClient.post("/register", payload);
  //   },
  //   sendVerification(payload) {
  //     return authClient.post("/email/verification-notification", payload);
  //   },
  //   updateUser(payload) {
  //     return authClient.put("/user/profile-information", payload);
  //   },
};
