import Display from "./components/Display";
import ButtonContainer from "./components/ButtonContainer.1";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [calVal, setCAlVal] = useState("");
  const onBtnClick = (event) => {
    let targetVal = event.target.childNodes[0].data;
    if (targetVal === "C") {
      setCAlVal("");
    } else if (targetVal === "=") {
      const result = eval(calVal);
      setCAlVal(result);
    } else {
      const newDisplayVal = calVal + targetVal;
      setCAlVal(newDisplayVal);
    }
  };

  return (
    <div id="calculator" className={styles.calsi}>
      <Display displayVal={calVal}></Display>
      <ButtonContainer onBtnClick={onBtnClick}></ButtonContainer>
    </div>
  );
}

export default App;
