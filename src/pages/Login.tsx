import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../constants/constants";
import AuthenticationService from "../services/AuthenticationService";
import localStorageService from "../services/LocalStorageService";
import { ILogin } from "../types/authentication/ILogin";
import utitlities from "../utilities/utilities";

function Login() {
  useEffect(() => {
    utitlities.cardExtender();
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    loginErrorMessage: "",
    loginError: false,
  });

  const [loader, setLoader] = useState(false);

  const [userData, setUserData] = useState<ILogin>({
    emailAddress: "",
    password: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  async function submit(event: SyntheticEvent) {
    event.preventDefault();
    setLoader(true);
    try {
      let response = await AuthenticationService.get(userData);
      localStorageService.setItem(
        "BeeHiveUserData",
        JSON.stringify(response.data.content)
      );
      constants.token = response.data.content.authorization.key;
      console.log(response.data.content.authorization.key);
      setLoader(false);
      navigate("/home");
    } catch (error: any) {
      setErrors({
        ...errors,
        loginErrorMessage: error.response.data.content.message,
        loginError: true,
      });
      setTimeout(() => {
        setErrors({
          ...errors,
          loginErrorMessage: "",
          loginError: false,
        });
      }, 3000);
      setLoader(false);
    }
  }

  return (
    <>
      <div
        id="loginError"
        className={
          errors.loginError
            ? "toast toast-bar toast-top rounded-l bg-red-dark shadow-bg shadow-bg-s show"
            : "toast toast-bar toast-top rounded-l bg-red-dark shadow-bg shadow-bg-s"
        }
        data-bs-delay="3000"
      >
        <div className="align-self-center">
          <i className="icon icon-s bg-white color-red-dark rounded-l shadow-s bi bi-exclamation-triangle-fill font-22 me-3"></i>
        </div>
        <div className="align-self-center">
          <strong className="font-13 mb-n2">Invalid Credentials!</strong>
          <span className="font-10 mt-n1 opacity-70">
            {errors.loginErrorMessage}
          </span>
        </div>
        <div className="align-self-center ms-auto">
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto font-9"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>

      <div className="page-content mb-0 pb-0">
        <div
          className="card card-style1 mb-0 bg-transparent shadow-0 bg-3 mx-0 rounded-0"
          data-card-height="cover"
        >
          <div className="card-center">
            <div className="card card-style">
              <div className="content">
                <form onSubmit={submit}>
                  <h1 className="text-center font-800 font-30 mb-2">Sign In</h1>
                  <p className="text-center font-13 mt-n2 mb-3">
                    Enter your Credentials
                  </p>
                  <div className="form-custom form-label form-icon mb-3">
                    <i className="bi bi-person-circle font-14"></i>
                    <input
                      type="email"
                      name="emailAddress"
                      required
                      className="form-control rounded-xs"
                      id="c1"
                      placeholder="John Doe"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="c1" className="color-theme">
                      Email
                    </label>
                    <span>(required)</span>
                  </div>
                  <div className="form-custom form-label form-icon mb-3">
                    <i className="bi bi-asterisk font-12"></i>
                    <input
                      type="password"
                      className="form-control rounded-xs"
                      id="c2"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={handleInputChange}
                    />
                    <label htmlFor="c2" className="color-theme">
                      Password
                    </label>

                    <span>(required)</span>
                  </div>
                  <button
                    className="btn btn-full gradient-green rounded-xs text-uppercase font-700 w-100 btn-s mt-4"
                    type="submit"
                  >
                    {loader ? (
                      <div className="loader_section">
                        <div className="loader loader_color "></div>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
