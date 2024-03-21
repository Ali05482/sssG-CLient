import { pageLoader } from "../context/provider";
import Swal from "sweetalert2";

const getFetcher = async (method, data = "", url) => {
  try {
    const apiUrl = "https://sssg-server-omega.vercel.app" + "/api/v1" + url;
    // const apiUrl = "http://localhost:4001" + "/api/v1" + url;
    const contentType = "application/json";
    pageLoader.setPageLoading(30);
    pageLoader.setPrimeReactLoader(true);
    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`,
        "Content-Type": contentType,
      },
    });
    if (response.status == 401) {
      Swal.fire({
        icon: "warning",
        title: "Oops..., Session Expired",
        text: "Please Re-login, you will be redirect in 2 seconds",
      });
      pageLoader.setPageLoading(60);
      setTimeout(() => {
        localStorage.clear();
        const baseUrl = window.location.origin;
        window.location.href = baseUrl + "/auth/login";
      }, 1500);
      return;
    }
    const result = await response.json();
    pageLoader.setPrimeReactLoader(false);
    pageLoader.setPageLoading(100);
    return {
      status: true,
      result,
    };
  } catch (error) {
    pageLoader.setPrimeReactLoader(false);
    pageLoader.setPageLoading(100);
    console.log("on Try Err", error.message);
    return {
      status: false,
      result: error,
    };
  }
};
export default getFetcher;
