import React, { useState } from 'react'
import styles from './HomePage.module.css'
import { Link, Navigate } from 'react-router-dom'
import InnerFormContainer from './InnerFormContainer/InnerFormContainer';
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {

    const { user } = useAuth();
    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>


                <div className={styles.formContainer}>

                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src="/src/assets/logo.png" alt="logo" />
                    </div>

                    <InnerFormContainer />

                </div>


                <div className={styles.bannerContainer}>

                    <img src="src/assets/banner.png" alt="" />

                </div>


            </div>

        </div>
    )
}