import React from "react";
import "./index.css";

// import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

// Get code from the URL
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  // return code ? <Dashboard code={code} /> : <Login />;
  return <Dashboard />;
}

export default App;
