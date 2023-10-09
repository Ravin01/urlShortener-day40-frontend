import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Reset } from "../components/Reset";
import { Home } from "../components/Home";
import PrivateRoute from "./PrivatedRoute";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Forgot } from "../components/Forgot";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index path="/" element={<PrivateRoute element={<Home />} />} />
          {/* <Route index path="/" element={<Home />}/> */}
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgotPassword" element={<Forgot />}/>
          <Route path="/resetPassword" element={<Reset />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
