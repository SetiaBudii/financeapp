import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
    const isLogin = Cookies.get("username");
    return isLogin ? props.children : <Navigate to="/login" />;

};

export default ProtectedRoute;

