import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SentParcels from "./components/sentParcels";
import ReceivedParcels from "./components/receivedParcels";
import IncomingParcels from './components/incomingParcels';
import MyAccount from "./components/myAccount";
import SendNewParcel from "./components/sendNewParcel";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sentParcels" element={<SentParcels />} />
        <Route path="/receivedParcels" element={<ReceivedParcels />} />
        <Route path="/incomingParcels" element={<IncomingParcels />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/sendNewParcel" element={<SendNewParcel />} />
      </Routes>
    </div>
  );
}

export default App;
