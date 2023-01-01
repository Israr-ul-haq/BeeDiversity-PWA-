import { Navigate } from "react-router-dom";
import moment from "moment";
// const parseJwt = (token: any) => {
//   try {
//     debugger;
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (e) {
//     return null;
//   }
// };
const PrivateRoute = ({ children }: any) => {
  if (JSON.parse(localStorage.getItem("BeeHiveUserData")!) === null) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  const user = JSON.parse(
    localStorage.getItem("BeeHiveUserData")!
  ).authorization;
  const dateToFormat: any = moment(Date.now()).format("lll");
  const expireDate: any = moment(user?.expiresAt).format("lll");

  if (expireDate <= dateToFormat) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  return children;
};
export default PrivateRoute;
