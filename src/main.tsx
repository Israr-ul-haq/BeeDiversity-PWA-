import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("page")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
