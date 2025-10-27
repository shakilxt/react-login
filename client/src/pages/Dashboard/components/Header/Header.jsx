import IconButton from '../../../../components/IconButton/IconButton';
import styles from './Header.module.css';

import pageLogo from '../../../../../public/assets/logo.png'

export default function Header() {
    return (
        <header className={styles.header}>

            <div className={styles.logoContainer}>
                <img className={styles.logo} src={pageLogo} alt="logo" />
            </div>

            <IconButton
                style={{ height: "2.5rem", width: "2.5rem" }}
                icon={
                    <i className="fas fa-user"></i>
                }
                onClick={() => { }}
                isTransparent={false}
            />

        </header>
    )
}