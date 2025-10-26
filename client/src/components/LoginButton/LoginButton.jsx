import styles from './LoginButton.module.css'

export default function LoginButton({ onClick, provider = "google", }) {

    const iconClass = `fa-brands fa-${provider}`;
    const providerStyle = styles[provider] || '';

    return (
        <button className={`${styles.loginButton} centered`} onClick={onClick}>

            <i className={`${iconClass} ${providerStyle}`}></i>
            <p>{provider.charAt(0).toUpperCase() + provider.slice(1)}</p>

        </button>
    )
}