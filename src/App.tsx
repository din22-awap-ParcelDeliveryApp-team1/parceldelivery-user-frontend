import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import SentParcels from "./views/sentParcels";
import ReceivedParcels from "./views/receivedParcels";
import MyAccount from "./views/myAccount";
import SendNewParcel from "./views/sendNewParcel";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import FrontPage from "./views/frontPage";
import Register from "./views/Register";
import Signin from "./views/Signin";
import { useAuthContext } from "./contexts/authContext";
import './App.css';


function App() {

  const { token } = useAuthContext() as any;

  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        {token ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/sentParcels" element={<SentParcels />} />
            <Route path="/receivedParcels" element={<ReceivedParcels />} />
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/sendNewParcel" element={<SendNewParcel />} />
          </>
        ) : null}
        <Route path="/Register" element={<Register />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;