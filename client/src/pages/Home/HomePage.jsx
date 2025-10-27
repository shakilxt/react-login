import React, { useState } from 'react'
import styles from './HomePage.module.css'
import { Link, Navigate } from 'react-router-dom'
import InnerFormContainer from './InnerFormContainer/InnerFormContainer';
import { useAuth } from '../../context/AuthContext';

import siteLogo from '../../../public/assets/logo.png'
import bannerImage from '../../../public/assets/banner.png'

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
                        <img className={styles.logo} src={siteLogo} alt="logo" />
                    </div>

                    <InnerFormContainer />

                </div>


                <div className={styles.bannerContainer}>

                    <img src={bannerImage} alt="" />

                </div>


            </div>

        </div>
    )
}