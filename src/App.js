import React from "react";

import Bakground from "./components/Bakground";
import Dashboard from "./components/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div style={{ height: "100vh" }} className="App">
      <Bakground />
      <Dashboard />
    </div>
  );
}

export default App;
