import Swal from "sweetalert2";
import { pageLoader } from "../context/provider";
const fetcher = async (
  method,
  data,
  url,
  type = "direct",
  contentType = "application/json"
) => {
  try {
    // const apiUrl = process.env.API_BASE_URL + process.env.API_VERSION + url
    const apiUrl = "https://sssg-server-omega.vercel.app" + "/api/v1" + url;
    // const apiUrl = "http://localhost:4001" + "/api/v1" + url
    pageLoader.setPageLoading(30);
    pageLoader.setPrimeReactLoader(true);
    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": contentType, Authorization: `${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(data),
    });
    pageLoader.setPageLoading(60);
    const result = await response.json();
    if (response.status == 401) {
      Swal.fire({
        icon: "warning",
        title: "Oops..., Session Expired",
        text: "Please Re-login, you will be redirect in 2 seconds",
      });
      pageLoader.setPrimeReactLoader(false);
      pageLoader.setPageLoading(100);
      setTimeout(() => {
        localStorage.clear();
        const baseUrl = window.location.origin;
        window.location.href = baseUrl + "/auth/login";
      }, 1500);
      return;
    } else {
      if (type === "direct") {
        if (result.status) {
          Swal.fire("Good job!", `${result.msg}`, "success");
          pageLoader.setPrimeReactLoader(false);
          pageLoader.setPageLoading(100);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops..., Something Went Wrong",
            text: `${result.msg}`,
          });
          pageLoader.setPrimeReactLoader(false);
          pageLoader.setPageLoading(100);
        }
      } else if (type === "callback") {
        if (result.status) {
          pageLoader.setPageLoading(100);
          pageLoader.setPrimeReactLoader(false);
          return {
            status: true,
            result,
          };
        } else {
          pageLoader.setPageLoading(100);
          pageLoader.setPrimeReactLoader(false);
          return {
            status: false,
            result,
          };
        }

      }
    }
  } catch (error) {
    if (type === "direct") {
      Swal.fire({
        icon: "warning",
        title: "Oops..., Something Went Wrong",
        text: "Please conact admin",
      });
      pageLoader.setPrimeReactLoader(false);
      pageLoader.setPageLoading(100);
    } else if (type === "callback") {
      pageLoader.setPageLoading(100);
      pageLoader.setPrimeReactLoader(false);
      return {
        status: false,
        result: error,
      };
    }
  }
};
export default fetcher;
