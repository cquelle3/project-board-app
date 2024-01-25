import { useContext } from "react"
import { AuthContext } from "../App"
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const { authInfo } = useContext(AuthContext);

    if(authInfo?.accessToken || localStorage.getItem('accessToken')){
        return(
            children
        );
    }
    else{
        return(
            <Navigate to='/login' replace />
        );
    }
}

export default ProtectedRoute