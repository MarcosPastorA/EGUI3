import React from "react";
import ReactDOM from "react-dom";

import Calendar from "./components/calendar";

const style = {
  position:"center", 
    margin: "10px auto",
    width: "102px",
    height: "100%"
}
function App() {
  return (
    <div className="App">
      <Calendar style={style} width= "80%"  />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);