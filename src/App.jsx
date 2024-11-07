import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.scss";
import AppRouter from "./routes";
import store from "@rtk/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
