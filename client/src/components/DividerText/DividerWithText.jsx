import styles from "./DividerWithText.module.css";

export default function DividerWithText({ text = "or with email" }) {
  return (
    <div className={styles.divider}>

      <hr className={styles.hr} />
      <p className="p1">{text}</p>
      <hr className={styles.hr} />

    </div>
  );
}