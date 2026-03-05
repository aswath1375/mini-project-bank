// import "./App.css";

// function AllData() {
//   const name = localStorage.getItem("name");
//   const account = localStorage.getItem("account");
//   const balance = localStorage.getItem("balance");

//   return (
//     <div className="container">
//       <h2>Account Details</h2>

//       {name ? (
//         <>
//           <p><b>Name:</b> {name}</p>
//           <p><b>Account No:</b> {account}</p>
//           <p><b>Balance:</b> ₹{balance}</p>
//         </>
//       ) : (
//         <p>No Account Created</p>
//       )}
//     </div>
//   );
// }

// export default AllData;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AllData() {
  const [groupedData, setGroupedData] = useState({});
  const [currentBalance, setCurrentBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const allTransactions =
      JSON.parse(localStorage.getItem("allTransactions")) || [];

    // 🔥 Sort latest first
    const sorted = [...allTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // 🔥 Group by Date (Only Date, not time)
    const grouped = {};

    sorted.forEach((tx) => {
      const dateKey = new Date(tx.date).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(tx);
    });

    setGroupedData(grouped);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentBalance(user.balance);
    }
  }, []);

  return (
    <div className="all-data-page" style={{ color: "white" }}>
      <h2>All Transactions</h2>

      {/* 💰 Current Balance */}
      <div
        style={{
          marginBottom: "25px",
          padding: "15px",
          backgroundColor: "#1e293b",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        💰 Current Balance: ₹{currentBalance}
      </div>

      {/* 🔥 Date wise grouping */}
      {Object.keys(groupedData).map((date, i) => (
        <div key={i} style={{ marginBottom: "30px" }}>
          
          {/* 📅 Date Heading */}
          <h3
            style={{
              borderBottom: "2px solid gray",
              paddingBottom: "5px",
              marginBottom: "15px",
            }}
          >
            📅 {date}
          </h3>

          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {groupedData[date].map((tx, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tx.name}</td>
                  <td>{tx.account || tx.accountNumber}</td>
                  <td>{tx.type}</td>
                  <td
                    style={{
                      color:
                        tx.type === "Deposit"
                          ? "lightgreen"
                          : "salmon",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{tx.amount}
                  </td>
                  <td>
                    {new Date(tx.date).toLocaleTimeString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          className="history-btn"
          onClick={() => navigate("/history")}
        >
          📜 View History
        </button>
      </div>
    </div>
  );
}

export default AllData;