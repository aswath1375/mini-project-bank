import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="card create-card" onClick={() => navigate("/createacc")}>
        <h3>Create Account</h3>
      </div>

      <div className="card deposit-card" onClick={() => navigate("/deposit")}>
        <h3>Deposit</h3>
      </div>

      <div className="card withdraw-card" onClick={() => navigate("/withdraw")}>
        <h3>Withdraw</h3>
      </div>
    </div>
  );
}

export default Dashboard;