// import React, { useState } from "react";
// import "./App.css";

// function Withdraw() {
//   const [amount, setAmount] = useState("");

//   const withdrawMoney = () => {
//     let balance = Number(localStorage.getItem("balance")) || 0;

//     if (!amount || amount <= 0) {
//       alert("Enter valid amount");
//       return;
//     }

//     if (Number(amount) > balance) {
//       alert("Insufficient Balance");
//       return;
//     }

//     balance -= Number(amount);
//     localStorage.setItem("balance", balance);

//     alert("Withdrawn ₹" + amount);
//     setAmount("");
//   };

//   return (
//     <div className="container">
//       <h2>Withdraw</h2>

//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       /><br /><br />

//       <button onClick={withdrawMoney}>Withdraw</button>
//     </div>
//   );
// }

// export default Withdraw;
// 2

// import React, { useState } from "react";
// import "./App.css";

// function Withdraw() {
//   const [amount, setAmount] = useState("");

//   const withdrawMoney = () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       alert("No account found");
//       return;
//     }

//     if (amount <= 0) {
//       alert("Enter valid amount");
//       return;
//     }

//     if (Number(amount) > Number(user.balance)) {
//       alert("Insufficient Balance");
//       return;
//     }

//     user.balance = Number(user.balance) - Number(amount);
//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Amount Withdrawn Successfully");
//     setAmount("");
//   };

//   return (
//     <div className="container">
//       <h2>Withdraw</h2>

//       <input
//         type="number"
//         placeholder="Enter Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       /><br /><br />

//       <button onClick={withdrawMoney}>Withdraw</button>
//     </div>
//   );
// }

// export default Withdraw;

// 3
import React, { useState, useEffect } from "react";
import "./App.css";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [timer, setTimer] = useState(30);

  // ⏳ Lock countdown
  useEffect(() => {
    let interval;

    if (locked && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setLocked(false);
      setAttempts(0);
      setTimer(30);
    }

    return () => clearInterval(interval);
  }, [locked, timer]);

  const withdrawMoney = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found");
      return;
    }

    if (locked) {
      alert(`Account Locked! Try again in ${timer} seconds`);
      return;
    }

    if (!account || !password || !amount) {
      alert("Fill all fields");
      return;
    }

    if (password !== user.password) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLocked(true);
        alert("Too many wrong attempts! Locked for 30 seconds 🔒");
      } else {
        alert(`Incorrect Password! Attempt ${newAttempts}/3`);
      }
      return;
    }

    if (Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (Number(amount) > Number(user.balance)) {
      alert("Insufficient Balance");
      return;
    }

    // ✅ Reset attempts
    setAttempts(0);

    user.balance = Number(user.balance) - Number(amount);

    if (!user.transactions) {
      user.transactions = [];
    }

    const transactionData = {
      name: user.name,
      accountNumber: user.account,
      type: "Withdraw",
      amount: amount,
      date: new Date().toISOString(),
    };

    user.transactions.push(transactionData);
    localStorage.setItem("user", JSON.stringify(user));

    let allTransactions =
      JSON.parse(localStorage.getItem("allTransactions")) || [];

    allTransactions.push(transactionData);
    localStorage.setItem(
      "allTransactions",
      JSON.stringify(allTransactions)
    );

    alert("Amount Withdrawn Successfully 💸");

    setAmount("");
    setAccount("");
    setPassword("");
  };

  return (
    <div className="container withdraw-page">
      <h2>Withdraw</h2>

      {locked && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          🔒 Account Locked! Try again in {timer} sec
        </p>
      )}

      {/* 🔥 Fake hidden fields to stop browser autofill */}
      <input
        type="text"
        name="fakeWithdrawUser"
        autoComplete="username"
        style={{ display: "none" }}
      />

      <input
        type="password"
        name="fakeWithdrawPass"
        autoComplete="current-password"
        style={{ display: "none" }}
      />

      {/* 🔐 Real Fields */}

      <input
        type="text"
        name="bankWithdrawAccount"
        autoComplete="new-password"
        placeholder="Enter Account Number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <input
        type="password"
        name="bankWithdrawPassword"
        autoComplete="new-password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="number"
        name="bankWithdrawAmount"
        autoComplete="off"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={withdrawMoney}>Withdraw</button>
    </div>
  );
}

export default Withdraw;