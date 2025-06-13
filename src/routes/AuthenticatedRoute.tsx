import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../auth';

export const AuthenticatedRoute = () => {
    const auth = useAuth();
    if (!auth.user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
    return <Outlet />;
}