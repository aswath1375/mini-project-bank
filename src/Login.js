import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionModal from "./Actionmodel";
import "./App.css";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found");
      return;
    }

    if (user.account !== account || user.password !== password) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    setShowModal(true);
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {/* 🔥 Fake hidden inputs to block browser autofill */}
      <input
        type="text"
        name="fakeUsername"
        autoComplete="username"
        style={{ display: "none" }}
      />

      <input
        type="password"
        name="fakePassword"
        autoComplete="current-password"
        style={{ display: "none" }}
      />

      {/* 🔐 Real Inputs */}
      <input
        type="text"
        placeholder="Account Number"
        name="bankAccountInput"
        autoComplete="new-password"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        name="bankSecurePass"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

      {showModal && (
        <ActionModal
          onDeposit={() => navigate("/deposit")}
          onWithdraw={() => navigate("/withdraw")}
        />
      )}
    </div>
  );
}

export default Login;