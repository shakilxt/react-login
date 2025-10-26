import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginButton from '../../../components/LoginButton/LoginButton'
import DividerWithText from '../../../components/DividerText/DividerWithText'
import InputMain from '../../../components/InputMain/InputMain'
import MainButton from '../../../components/Button/MainButton'
import styles from './InnerFormContainer.module.css'
import { useAuth } from '../../../context/AuthContext'
import { Form, useNavigate } from 'react-router-dom'

export default function InnerFormContainer(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isSignUp, setIsSignUp] = useState(false);

    const { handleLogin, handleRegister, loading, error } = useAuth()
    const [localError, setlocalError] = useState();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp) {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            await handleRegister(name, email, password);
        } else {
            const success = await handleLogin(email, password);
            if (success) {
                navigate('/dashboard');
            }
        }

    }

    const inputAnimation = {
        i: { y: 10, opacity: 0 },
        a: { y: 0, opacity: 1 },
        e: { y: -10, opacity: 0 },
        t: { duration: 0.2 }
    };

    return (
        <div className={styles.innerFormContainer}>

            <h3>{isSignUp ? "Create Account" : "Welcome Back"}</h3>
            <p className='p1'>Enter your {isSignUp ? "Sign Up" : "Login"} details below</p>

            {
                !isSignUp && (
                    <div className={styles.thirdLoginContainer}>
                        <div className={styles.thirdLogin}>

                            <LoginButton provider='google'
                                onClick={
                                    () => alert('Login with Google')
                                }
                            />
                            <LoginButton provider='facebook'
                                onClick={
                                    () => alert('Login with Facebook')
                                }
                            />

                        </div>

                        <DividerWithText />
                    </div>
                )
            }


            <div className={styles.formContainer}>

                <Form onSubmit={handleSubmit}>

                    <AnimatePresence>
                        {isSignUp && (
                            <motion.div
                                variants={inputAnimation} initial="i" animate="a"
                                exit="e" transition="t" layout
                            >
                                <InputMain
                                    label="Full Name"
                                    type="text"
                                    id="full-name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isRequired={true}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

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

                    <AnimatePresence>
                        {isSignUp && (
                            <motion.div
                                variants={inputAnimation} initial="i" animate="a"
                                exit="e" transition="t" layout
                            >
                                <InputMain
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    placeholder="At least 8 characters"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    isRequired={true}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={styles.mainButtonArea}>

                        <p><a href="#">{!isSignUp ? "Forgot Password?" : ""}</a></p>

                        <MainButton
                            type="submit"
                            disabled={loading}
                        >
                            {isSignUp ? "Sign Up" : "Login"}
                        </MainButton>

                        {
                            error &&
                            <p style={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>
                                {error}</p>
                        }

                        <p>{isSignUp ? "Already have an account?" : "Don't have an account?"} <a onClick={(e) => {
                            e.preventDefault()
                            setIsSignUp(!isSignUp)
                        }}>{isSignUp ? "Login" : "Sign Up"}</a></p>

                    </div>

                </Form>

            </div>



        </div>

    )
}