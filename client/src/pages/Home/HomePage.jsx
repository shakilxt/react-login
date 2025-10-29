import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {

    const { user } = useAuth();
    if (user) {
        return <Navigate to="/posts" replace />
    } else {
        return <Navigate to="/login" replace />
    }

}