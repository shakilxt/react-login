import styles from './InputMain.module.css'

export default function InputMain({ label, type, id, placeholder, value, onChange, isRequired = false }) {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={id}>
                {label} {isRequired && <span className={styles.required}>*</span>}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}