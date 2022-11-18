import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const data = localStorage.getItem("user");

  const userInfo = data && JSON.parse(data);

  return userInfo && userInfo.user_token ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
