import styles from './IconButton.module.css';


export default function IconButton({ style = {}, icon, onClick, isTransparent = false, disabled = false }) {

    const isTransparentClass = isTransparent ? styles.transparent : '';

    return (
        <button
            style={style}
            className={`${styles.iconButton} ${isTransparentClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </button>
    );

}