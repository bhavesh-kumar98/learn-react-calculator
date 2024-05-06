import styles from "./Display.module.css";

export default function Display({ displayVal }) {
  return (
    <input
      type="text"
      id="display"
      className={styles.display}
      value={displayVal}
      readOnly
    />
  );
}
