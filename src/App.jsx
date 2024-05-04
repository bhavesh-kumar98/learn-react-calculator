import Display from "./components/Display";
import ButtonContainer from "./components/ButtonContainer.1";
import styles from "./App.module.css";

function App() {
  return (
    <div id="calculator" className={styles.calsi}>
      <Display></Display>
      <ButtonContainer></ButtonContainer>
    </div>
  );
}

export default App;
