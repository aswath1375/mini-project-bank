import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navi from "./Navi";
import Login from "./Login";
import Home from "./Home";
import Create from "./Createacc";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import AllData from "./Alldata";
import History from "./History";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Navi />
      <Routes>
             <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
        <Route path="/Createacc" element={<Create />} />
        <Route path="/Deposit" element={<Deposit />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        <Route path="/Alldata" element={<AllData />} />
        <Route path="/History" element={<History />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}





export default App;
