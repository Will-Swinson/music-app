import React from "react";
import "./index.css";

// import Login from "./Login.jsx";

import Dashboard from "./Dashboard";
import Login from "./Login";
// Get code from the URL

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
