import IconButton from '../../../../components/IconButton/IconButton';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>

            <div className={styles.logoContainer}>
                <img className={styles.logo} src="/assets/logo.png" alt="logo" />
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