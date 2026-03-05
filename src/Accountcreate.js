import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function CreateAccount() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");

  const createAccount = () => {
    const user = {
      name,
      account,
      balance: 0,
      transactions: [],
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account Created 🎉");
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        type="text"
        placeholder="Enter Account Number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      /><br /><br />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={createAccount}
      >
        Create Account
      </motion.button>
    </motion.div>
  );
}

export default CreateAccount;