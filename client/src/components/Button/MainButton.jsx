import styles from "./MainButton.module.css"

export default function MainButton({ children, onClick, type = 'button', disabled = false, style = {} }) {
    return (
        <button
            className={styles.btnMain}
            type={type} onClick={onClick}
            disabled={disabled}
            style={style}
            >
            {children}
        </button>
    )
}