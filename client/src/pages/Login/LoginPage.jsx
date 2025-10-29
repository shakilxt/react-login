import LoginForm from "./components/LoginForm"

import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom'

export default function LoginPage() {

    const { user } = useAuth();
    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className="min-h-screen bg-gray-900 px-4 lg:px-4 py-12 lg:py-0 text-gray-50 justify-center items-center">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-24 items-center">

                {/* Form Area */}
                <div className="relative h-full col-span-3">

                    <div className="w-full mx-auto sm:absolute py-0 lg:py-12">
                        <img className="w-30" src="/assets/s-epi.png" alt="" />
                    </div>

                    <LoginForm />

                </div>

                {/* Banner Area */}
                <div className="h-25 md:h-50 lg:h-screen col-span-3 lg:col-span-2 place-items-end py-0 lg:py-4">
                    <img src="/assets/banner.png"
                        className="w-full h-full max-h-3xl rounded md:rounded-xl lg:rounded-2xl object-cover object-right"
                        alt="" />
                </div>

            </div>




        </div>
    )
}