import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import SentParcels from "./views/sentParcels";
import ReceivedParcels from "./views/receivedParcels";
import MyAccount from "./views/myAccount";
import SendNewParcel from "./views/SendNewParcel";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import FrontPage from "./views/frontPage";
import Register from "./views/Register";
import Signin from "./views/Signin";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sentParcels" element={<SentParcels />} />
        <Route path="/receivedParcels" element={<ReceivedParcels />} />
        {/* from chatGPT import chatGPT */}
        {/* <Route path="/myAccount" element={<MyAccount {...user} />} /> */}
         <Route path="/myAccount" element={<MyAccount />} /> 
        <Route path="/SendNewParcel" element={<SendNewParcel />} />
        <Route path="/Register" element={<Register />} />
       <Route path="/Signin" element={<Signin />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
