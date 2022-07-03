import { useFlashMessage } from "@/composables/useFlashMessage";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { logout } from "@/utils/auth";
import router from "@/router";
import Auth from "@/services/AuthService";

export const apiUrl = `${import.meta.env.VITE_API_URL}/api`;
export const appUrl = `${import.meta.env.VITE_API_URL}`;

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 419
    ) {
      useFlashMessage().showFlash(
        {
          title: "unauthorized",
          message:
            "you are not authorized to perform such action. please login using credentials with the authorized priveleges",
          id: "unauthorized",
          type: "error",
        },
        6000
      );
      logout();
      router.back();
      // Auth.LogoutUser().then(() => {
      // });
    } else if (error.response?.status === 422) {
      showErrors(error);
    } else {
      useFlashMessage().showFlash(
        {
          title: "Exception",
          message: error.response?.statusText ?? "Unknown Error",
          id: "exception",
          type: "error",
        },
        5000
      );
    }
    return Promise.reject(error.response);
  }
);
export const showErrors = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    console.log("error");
    const flash = useFlashMessage();
    const data = error.response?.data;
    const title = data.message;
    const errors = data.errors;
    let id = 1;
    for (const errorKey in errors) {
      ++id;
      let message = "";
      console.log(errors[errorKey]);
      for (const error of errors[errorKey]) {
        message += ` ${error}`;
      }
      flash.showFlash({ title, message, type: "error", id }, 5000);
    }
  }
  console.log(error);
};
