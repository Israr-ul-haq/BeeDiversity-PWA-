import { useEffect } from "react";
import Routes from "./routes/Routes";
function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("./serviceWorker.js");
      });
    }
  }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
