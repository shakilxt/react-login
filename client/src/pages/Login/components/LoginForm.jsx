import React, { useState } from 'react'
import ThirdLoginButton from "./ThirdLoginButton";
import InputMain from "./InputMain";
import MainButton from "./MainButton";

import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isLogin, setIsLogin] = useState(true);

    const { handleLogin, handleRegister, loading, error } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const success = await handleLogin(email, password);
            if (success) {
                navigate('/dashboard');
            }
        } else {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            await handleRegister(name, email, password);
        }
    }

    return (

        <div className="mx-auto w-full max-w-md h-full flex flex-col justify-center text-center px-0 sm:px-8 py-12">

            <div className="grid place-items-center">

                <h1 className={`
                            col-start-1 row-start-1
                            text-3xl font-bold md:text-4xl
                            transition-opacity duration-500 ease-in-out
                            ${isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}>
                    Welcome Back
                </h1>

                <h1 className={`
                            col-start-1 row-start-1
                            text-3xl font-bold md:text-4xl
                            transition-opacity duration-500 ease-in-out
                            ${!isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}>
                    Create an Account
                </h1>

            </div>


            <p className="text-base text-gray-500 mt-2">
                Enter your {isLogin ? 'Login' : 'Registration'} details below</p>

            <div className="mx-auto flex flex-row gap-4 mt-6 px-3 place-items-center ">

                <ThirdLoginButton
                    iconClass={"fa-github"}
                    providerName={"GitHub"}
                />

                <ThirdLoginButton
                    iconClass={"fa-facebook"}
                    providerName={"Facebook"}
                />

            </div>

            <div className="flex items-center w-full my-6">

                <hr className="flex grow border-t border-gray-500" />
                <span className="mx-4 text-gray-500">or with email</span>
                <hr className="flex grow border-t border-gray-500" />

            </div>

            {/* form inner */}
            <div className="mx-auto w-full px-3">

                <form className="mt-4 text-left space-y-4"
                    onSubmit={handleSubmit}>

                    <div className={`
                                transition-all duration-300 ease-in-out overflow-hidden
                                ${!isLogin ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                        <InputMain
                            label="Full Name"
                            type="text"
                            id="full-name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isRequired={true}
                        />
                    </div>

                    <InputMain
                        label="Work Email"
                        type="email"
                        id="work-email"
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isRequired={true}
                    />

                    <InputMain
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired={true}
                    />

                    <div className={`
                                transition-all duration-300 ease-in-out overflow-hidden
                                ${!isLogin ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                        <InputMain
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            placeholder="At least 8 characters"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isRequired={true}
                        />
                    </div>

                    <div>

                        <div className="w-full text-right">
                            <a href="#"
                                className="text-md text-brand font-medium">
                                Forgot Password?</a>
                        </div>

                        <MainButton
                            type="submit"
                            disabled={loading}
                            text={isLogin ? "Login" : "Create Account"}
                        />

                        {
                            error &&
                            <p className='text-red-500 text-center mt-2'>
                                {error}</p>
                        }

                        <div className="text-center mt-2">
                            <p className="text-md text-gray-500">
                                Don't have an account? <a onClick={() => setIsLogin(!isLogin)}
                                    className="text-brand font-medium cursor-pointer">{isLogin ? "Sign up" : "Login"}</a>
                            </p>
                        </div>

                    </div>



                </form>




            </div>


        </div>
    )

}