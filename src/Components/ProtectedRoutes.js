import { Suspense, useContext } from 'react';
import { UserInfo } from '../context/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router';
const ProtectedRoutes = ({ allowedRoles }) => {
    const userInfo = useContext(UserInfo);
    const user_role = userInfo?.user_metadata.role === undefined ? 1 : userInfo?.user_metadata.role;
    const location = useLocation().pathname;
    console.log(user_role, ' Protected');
    const check_if_token = localStorage.getItem('sb-uprfurpajbpzdywrkheh-auth-token');
    function checkValidation() {
        if (check_if_token) {
            if (user_role >= allowedRoles) {
                return (
                    <Suspense fallback={<h1>loading...</h1>}>
                        <Outlet />
                    </Suspense>
                );
            } else {
                return <Navigate to='pricing' replace />;
            }
        }
        else {
            return <Navigate to={'login?message=@You should login first to use V2'} replace state={location} />;
        }

    }
    return (
        <>
            <h1 className={'container'} style={{ color: 'red', position: 'fixed', top: '50%', left: '0%', zIndex: '111', backgroundColor: 'black' }}>This section just for apply protected routes with Outlet Go to Products</h1>
            {
                checkValidation()
            }
        </>
    );
};

export default ProtectedRoutes;
