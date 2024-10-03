import "./App.css";
import Chat from "./components/Chat";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter className="app">
      <Routes>
        {" "}
        <Route path="/" element={<Chat />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
