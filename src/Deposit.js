// import React, { useState } from "react";
// import "./App.css";

// function Deposit() {
//   const [amount, setAmount] = useState("");

//   const depositMoney = () => {
//     if (!amount || amount <= 0) {
//       alert("Enter valid amount");
//       return;
//     }

//     let balance = Number(localStorage.getItem("balance")) || 0;
//     balance += Number(amount);
//     localStorage.setItem("balance", balance);

//     alert("Deposited ₹" + amount);
//     setAmount("");
//   };

//   return (
//     <div className="container">
//       <h2>Deposit</h2>

//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       /><br /><br />

//       <button onClick={depositMoney}>Deposit</button>
//     </div>
//   );
// }

// export default Deposit;

// 2

// import React, { useState } from "react";
// import "./App.css";

// function Deposit() {
//   const [amount, setAmount] = useState("");

//   const depositMoney = () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       alert("No account found");
//       return;
//     }

//     if (amount <= 0) {
//       alert("Enter valid amount");
//       return;
//     }

//     user.balance = Number(user.balance) + Number(amount);
//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Amount Deposited Successfully");
//     setAmount("");
//   };

//   return (
//     <div className="container">
//       <h2>Deposit</h2>

//       <input
//         type="number"
//         placeholder="Enter Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       /><br /><br />

//       <button onClick={depositMoney}>Deposit</button>
//     </div>
//   );
// }

// export default Deposit;

// 3
import React, { useState } from "react";
import "./App.css";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState(""); // ✅ NEW

  const depositMoney = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found");
      return;
    }

    if (!account) {
      alert("Enter Account Number");
      return;
    }

    if (!password) {
      alert("Enter Password");
      return;
    }

    // ❌ wrong password
    if (password !== user.password) {
      alert("Incorrect Password");
      return;
    }

    if (amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    // ✅ balance update
    user.balance = Number(user.balance) + Number(amount);

    if (!user.transactions) {
      user.transactions = [];
    }

    const transactionData = {
      name: user.name,
      accountNumber: user.account,
      type: "Deposit",
      amount: amount,
      date: new Date().toISOString(),
    };

    // ✅ push user history
    user.transactions.push(transactionData);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ push global history
    let allTransactions =
      JSON.parse(localStorage.getItem("allTransactions")) || [];

    allTransactions.push(transactionData);

    localStorage.setItem(
      "allTransactions",
      JSON.stringify(allTransactions)
    );

    alert("Amount Deposited Successfully 💰");

    setAmount("");
    setAccount("");
    setPassword("");
  };

  return (
    <div className="container deposit-page">
      <h2>Deposit</h2>

      <input
        type="text"
        placeholder="Enter Account Number"
        value={account}
        autoComplete="off"
        onChange={(e) => setAccount(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={depositMoney}>Deposit</button>
    </div>
  );
}

export default Deposit;