import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Vpn from "./pages/Vpn/Vpn";

function App() {
  React.useEffect(() => {
    window.Telegram.WebApp.expand();
    //document.documentElement.className = "light";
  }, []);

  function setThemeClass() {
    document.documentElement.className = window.Telegram.WebApp.colorScheme;
  }

  window.Telegram.WebApp.onEvent("themeChanged", setThemeClass);
  setThemeClass();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Vpn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
