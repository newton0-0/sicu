import {Outlet, Navigate} from "react-router-dom"

const PrivateRoute = () => {
    const auth = localStorage.getItem("auth");
    return(
        <div className="dashboardPage">
            {auth? <Outlet/> : <Navigate to="/"/>}
        </div>
    )
}

export default PrivateRoute;