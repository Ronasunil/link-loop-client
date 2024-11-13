import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.scss";
import AppRouter from "./routes";
import store from "@rtk/store";
import { useEffect } from "react";
import { socket } from "@socket/Socket";

function App() {
  // useEffect(() => {
  //   socket.socketConnection();
  // }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Toaster />
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
