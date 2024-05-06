import styles from "./ButtonContainer.module.css";

export default function ButtonContainer({onBtnClick}) {
  const arithmeticOp = ["/", "*", "-", "+", "C", "="];
  const buttonsNames = [
    "C",
    "/",
    "*",
    "+",
    "1",
    "2",
    "3",
    "-",
    "4",
    "5",
    "6",
    ".",
    "7",
    "8",
    "9",
    "=",
    "0",
  ];
  return (
    <div id="buttons-container" className={styles.btnContainer}>
      {buttonsNames.map((buttonsName) => (
        <button 
        onClick={onBtnClick}
          key={buttonsName}
          className={`${styles.btn}  ${
            arithmeticOp.includes(buttonsName) ? styles.btnOpr : styles.btnNum
          }`}
        >
          {buttonsName}
        </button>
      ))}
    </div>
  );
}
