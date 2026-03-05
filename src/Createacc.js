// import React, { useState } from "react";
// import "./App.css";

// function Create() {
//   const [name, setName] = useState("");
//   const [account, setAccount] = useState("");

//   const createAccount = () => {
//     if (!name || !account) {
//       alert("Fill all fields");
//       return;
//     }

//     localStorage.setItem("name", name);
//     localStorage.setItem("account", account);
//     localStorage.setItem("balance", "0");

//     alert("Account Created Successfully");
//     setName("");
//     setAccount("");
//   };

//   return (
//     <div className="container">
//       <h2>Create Account</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       /><br /><br />

//       <input
//         type="text"
//         placeholder="Account Number"
//         value={account}
//         onChange={(e) => setAccount(e.target.value)}
//       /><br /><br />

//       <button onClick={createAccount}>Create</button>
//     </div>
//   );
// }

// export default Create;



// 2

// import React, { useState } from "react";
// import "./App.css";

// function Create() {
//   const [formData, setFormData] = useState({
//     name: "",
//     account: "",
//     email: "",
//     password: "",
//     phone: "",
//     aadhaar: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const createAccount = () => {
//     const { name, account, email, password, phone, aadhaar } = formData;

//     if (!name || !account || !email || !password || !phone || !aadhaar) {
//       alert("Please fill all fields");
//       return;
//     }

//     const user = {
//       name,
//       account,
//       email,
//       password,
//       phone,
//       aadhaar,
//       balance: 0,
//     };

//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Account Created Successfully");

//     setFormData({
//       name: "",
//       account: "",
//       email: "",
//       password: "",
//       phone: "",
//       aadhaar: "",
//     });
//   };

//   return (
//     <div className="container">
//       <h2>Create Account</h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//       /><br /><br />

//       <input
//         type="text"
//         name="account"
//         placeholder="Account Number"
//         value={formData.account}
//         onChange={handleChange}
//       /><br /><br />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email ID"
//         value={formData.email}
//         onChange={handleChange}
//       /><br /><br />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//       /><br /><br />

//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleChange}
//       /><br /><br />

//       <input
//         type="text"
//         name="aadhaar"
//         placeholder="Aadhaar Number"
//         value={formData.aadhaar}
//         onChange={handleChange}
//       /><br /><br />

//       <button onClick={createAccount}>Create Account</button>
//     </div>
//   );
// }

// export default Create;


// 3
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function CreateAccount() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // 🔥 Strong Email Regex
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|in)$/;

  const handleEmailChange = (e) => {
    const value = e.target.value.trim(); // remove spaces
    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailError("❌ Invalid Email Format");
    } else {
      setEmailError("✅ Valid Email");
    }
  };

  const handleCreate = () => {
    if (!name || !account || !password || !aadhaar || !phone || !email) {
      alert("Fill all fields");
      return;
    }

    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(aadhaar)) {
      alert("Aadhaar number must be exactly 12 digits");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid Email Format");
      return;
    }

    // 🔥 Duplicate Email Check
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      alert("Email already registered");
      return;
    }

    const user = {
      name,
      account,
      password,
      aadhaar,
      phone,
      email,
      balance: 0,
      transactions: [],
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created Successfully 🎉");
    navigate("/");
  };

  return (
    <div className="create-page">
      <h2>Create Account</h2>

      <input type="text" style={{ display: "none" }} />
      <input type="password" style={{ display: "none" }} />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Account Number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Aadhaar Number"
        value={aadhaar}
        maxLength={12}
        onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        maxLength={10}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />

      {/* 🔥 Live Email Status */}
      {email && (
        <p
          style={{
            color: emailRegex.test(email) ? "green" : "red",
            fontWeight: "bold",
            marginTop: "5px",
          }}
        >
          {emailError}
        </p>
      )}

      <button onClick={handleCreate}>Create Account</button>
    </div>
  );
}

export default CreateAccount;