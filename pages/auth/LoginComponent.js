import React, { useContext, useState, useRef } from "react";
import MainContext from "../../src/app/context/context";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import Link from "next/link";
const LoginComponent = () => {
  const router = useRouter();
  const errorThrower = useRef(null);
  const loaderSUbmit = useRef(null);
  const loader = useRef(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const global = useContext(MainContext);
  const handdleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleLogin = async (e) => {
   try {
    global.pageLoader.setPageLoading(30);
    e.preventDefault();
    loaderSUbmit.current.style.display = "none";
    loader.current.style.display = "";
    errorThrower.current.innerHTML = "";
    global.pageLoader.setPageLoading(50);
    const res = await global.login(login, "callback");
    global.pageLoader.setPageLoading(70);
    if (res.result.validation) {
      setErrors(res.result.data);
      loaderSUbmit.current.style.display = "";
      loader.current.style.display = "none";
      global.pageLoader.setPageLoading(100);
      return;
    } else {
      setErrors([]);
      if (!res.result.status) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<b>${res.result.msg}</b>`,
        });
        errorThrower.current.innerHTML = res.result.msg;
        loaderSUbmit.current.style.display = "";
        loader.current.style.display = "none";
        global.pageLoader.setPageLoading(100);
      } else {
        global.pageLoader.setPageLoading(100);        
        localStorage.setItem("authToken", res.result.data);
        router.push("/");
        loaderSUbmit.current.style.display = "";
        loader.current.style.display = "none";
      }
    }
   } catch (error) {
    loaderSUbmit.current.style.display = "";
    loader.current.style.display = "none";
    Swal.fire({
      icon:"error",
      text:"Something Went Wrong with your account, Please contact admin"
    })
   }
  };
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="/login/images/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid" />
            </div>
            {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
              </div>}
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Sign In</h3>
                    <p className="mb-4">Sign In To Fitwell PK</p>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="form-group first">
                    {/* value="ali.usama@ssg.com" */}
                      <input onChange={handdleChange} type="text" className="form-control" placeholder="username"  name="email" id="email" />
                    </div>
                    <span className="text-danger">{errors?.map((item) => (item.path === "email" ? item.msg + ",  " : ""))}</span>
                    <div className="form-group last mb-4">
                   
                      <input onChange={handdleChange} type="password" placeholder="********" className="form-control"  name="password" id="password" />
                    </div>
                    <span className="text-danger">{errors?.map((item) => (item.path === "password" ? item.msg : ""))}</span>

                    <div className="d-flex mb-5 align-items-center">
                      <label className="control control--checkbox mb-0">
                        <span className="caption">Remember me</span>
                        <input onChange={handdleChange} type="checkbox" checked="checked" />
                        <div className="control__indicator"></div>
                      </label>
                      <span className="ml-auto">
                        <a href="#" className="forgot-pass">
                          Forgot Password
                        </a>
                      </span>
                    </div>

                    <center>
                      {" "}
                      <span ref={errorThrower} className="text-danger my-3"></span>
                    </center>
                    <button ref={loaderSUbmit} type="submit" value="Log In" className="btn btn-block btn-primary">
                      Log In
                    </button>
                    <Link href="./patient/sign-up"  className="btn btn-block btn-primary">
                     Patient SignUp
                    </Link>
                    <button ref={loader} style={{ display: "none" }} className="btn btn-block btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="visually-hidden">Loading...</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
