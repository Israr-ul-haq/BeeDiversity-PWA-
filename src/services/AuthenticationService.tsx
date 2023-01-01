import utitlities from "../utilities/utilities.js";
import { IUser } from "../types/authentication/IUser";
import { ILogin } from "../types/authentication/ILogin.js";
const get = (userLoginData: ILogin) => {
  return utitlities.axios.post<IUser>(`/users/login`, userLoginData);
};

const AuthenticationService = {
  get,
};
export default AuthenticationService;
