**1. Starting:**
- create react app using vite
- project file **structure**
- file extension **.jsx**
- **export**/import, default/naming
- **dynamic** Component/content { using this }
- how to **create** Component and **export**
- how to **use** Component and **import**
- and how to **reuse** Component
- we use **'className'** instance of 'class'
- **nesting** comp.
- how to add **css** in React
- and last basic **Bootstrap**

**2. Deploy**
How to **deploy** on GitHub a **react** + **vite** app

- setup base in vite.cofig
  _base: "/[GitHub-Repo-Name]/"_

- Create ./github/workflows/deploy.yml and add the code bellow

  ```bash
    name: Deploy

    on:
      push:
        branches:
          - main

    jobs:
      build:
        name: Build
        runs-on: ubuntu-latest

        steps:
          - name: Checkout repo
            uses: actions/checkout@v2

          - name: Setup Node
            uses: actions/setup-node@v1
            with:
              node-version: 16

          - name: Install dependencies
            uses: bahmutov/npm-install@v1

          - name: Build project
            run: npm run build

          - name: Upload production-ready build files
            uses: actions/upload-artifact@v2
            with:
              name: production-files
              path: ./dist

      deploy:
        name: Deploy
        needs: build
        runs-on: ubuntu-latest
        if: github.ref == 'refs/heads/main'

        steps:
          - name: Download artifact
            uses: actions/download-artifact@v2
            with:
              name: production-files
              path: ./dist

          - name: Deploy to GitHub Pages
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./dist

  ```

- Add, Commit and Push to GitHub
- Active workflow (GitHub on webpage)

  ```bash
        Config > Actions > General > Workflow permissions > Read and Write permissions

        Actions > failed deploy > re-run-job failed jobs

        Pages > gh-pages > save

  ```

**3. Basic**
- Fragements <>...</>
- **Map** method
  ```bash
    {buttonsNames.map(buttonsName=><button>{buttonsName}</button>)}
  ```
- **key props**
  ```bash
    <div **key**={item.id}>...</div>
  ```
- **Conditional Rendering**

  - *Ternary* opr. **?:**, *logical* opr. **&&**

    ```bash
      con ? value1 : value2
      {items === 0 ? <h3> Con id true </h3> : null;}
      con && con
      {items === 0 && <h3> Con id true </h3>}

    ```

- *passing* Data Via **props***

  ```bash
    //APP.jsx
    let myData = [1,2,3];
    <HeaderComp myPropName={myData}></HeaderCopm>
    <FooterComp myPropName={myData}></FooterComp>

    //HeaderComp.jsx
    //using destructuring method
    export default function HeaderComp({myPropName}) {
      return(<p>{myPropName[0]}</p>);

    //FooterComp.jsx
    export default function FooterComp(prop) {
      return(<p>{prop.myPropName[0]}</p>);
    }

  ```

- **CSS Modules**

  - file ext. **fileNmae.modules.css**
  - ex: **NavComp.modules.css**

    ```bash
      //APP.jsx
      <HeaderComp></HeaderCopm>
      <NavComp></NavComp>

      //NavComp.modules.css
      .navMenu { bg-c: blue;}
      .navBtn { bg-c: black;}

      //NavComp.jsx
      import styles from './NavrComp.modules.css'

      export default function NavComp() {
        return(

                <p className={styles.navMenu}> this is color blue </p>
                <p className={styles.navBtn}> this is color black </p>
              );
        }
    ```

**4. In this commit**
- *Passing* **Children**
  ```bash
    //App.jsx
  
    function App() {
      return (
        <>
          <Container>
            <h1>hello</h1>
            <Randome />
          </Container>
  

          <Container>
            <Bsbtn></Bsbtn>
          </Container>

  
          <Randome />

          <Container>
            <Randome></Randome>
            <p className="myClass">this is react app</p>
          </Container>

        </>
      );
    }

    //Container.jsx
    import styles from './Container.module.css'

    export default function Container(props) {
      return <div className={styles.divs}>{props.children}</div>;
    }
  
    //Container.module.css
    .divs {
      margin: 30px auto;
      width: 50%;
      border-radius: 20px;
      border: 2px solid black;
      padding: 30px;
      background-color: wheat;
    }
          
  ```
  
- **Handling(can be funt) Event & Passing Fun't/method/handle via pros**
  ```bash
      function App() {

        //Handle(onBtnClick) of event(onClick)
  
        const onBtnClick = (event) => {
          let targetVal = event.target.childNodes[0].data;
          console.log(targetVal);
        };
      
        return (
          <div id="calculator" className={styles.calsi}>

            //passing by props(onBtnClickprops), defines funt(onBtnClick) in parent(App.jsx)
            // call by child(ButtonContainer)
            <ButtonContainer onBtnClickprops={onBtnClick}></ButtonContainer>
          </div>
        );
      }

      //ButtonContainer.jsx
      //passing handle via props(onBtnClickprops)
      export default function ButtonContainer({onBtnClickprops}) {
        const buttonsNames = ["C", "/", "*", "+", "1", "2", "3", "-", "4", "5", "6", ".", "7", "8", "9", "=", "0",];
        return (
          <div>
            {buttonsNames.map((buttonsName) => (
              <button
              //call(onBtnClickprops) by child
              onClick={onBtnClickprops}
              >
                {buttonsName}
              </button>
            ))}
          </div>
        );
      }      
  ```

- **Managing States, useState()**
    ```bash
      //first import the useState hook  
      import { useState } from "react";
      
      function App() {
        //setup usestate: [current value, and method] = useState(initialValue)
    
        const [calVal, setCAlVal] = useState("");

        //handle, that assign the updated value to method(setCAlVal())
        const onBtnClick = (event) => {
          let targetVal = event.target.childNodes[0].data;
          if (targetVal === "C") {
            setCAlVal("");
          } else if (targetVal === "=") {
            const result = eval(calVal);
            setCAlVal(result);
          } else {
            const newDisplayVal = calVal + targetVal;

            //value update to the current value (calVal)
            setCAlVal(newDisplayVal);
          }
        };
      
        return (
          <div id="calculator" className={styles.calsi}>

            //pass updated value(current value)
            <Display displayVal={calVal}></Display>

            //event that pass event/value(targetVal)
            <ButtonContainer onBtnClick={onBtnClick}></ButtonContainer>
          </div>
        );
      }
      
      export default App;
      //ButtonContainer.jsx
      //passing handle via props(onBtnClickprops)
      export default function ButtonContainer({onBtnClickprops}) {
        const buttonsNames = ["C", "/", "*", "+", "1", "2", "3", "-", "4", "5", "6", ".", "7", "8", "9", "=", "0",];
        return (
          <div>
            {buttonsNames.map((buttonsName) => (
              <button
              //call(onBtnClickprops) by child
              onClick={onBtnClickprops}
              >
                {buttonsName}
              </button>
            ))}
          </div>
        );
      } 
    ```
- 