import { UserI } from "@/types/interfaces";
import Cookies from "js-cookie";

const keys = {
  user: "user",
  authenticated: "user",
};
export const login = (user: UserI) => {
  localStorage.setItem(keys.user, JSON.stringify(user));
  Cookies.set(keys.authenticated, "true");
};
export const logout = () => {
  localStorage.removeItem(keys.user);
  Cookies.remove(keys.authenticated);
};
export const loggedInUser = (): UserI => {
  const user = localStorage.getItem(keys.user);
  if (user != null) {
    return JSON.parse(user);
  } else {
    logout();
    throw Error;
  }
};
export const isLoggedIn = () => Cookies.get(keys.authenticated) == "true";
