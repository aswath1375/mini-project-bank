// import React from "react";
// import "./App.css";

// function History() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const clearHistory = () => {
//     if (!user) return;

//     user.transactions = [];
//     localStorage.setItem("user", JSON.stringify(user));
//     alert("Transaction History Cleared");
//     window.location.reload();
//   };

//   if (!user || !user.transactions || user.transactions.length === 0) {
//     return (
//       <div className="container">
//         <h3>No Transactions Found</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <h2>Transaction History</h2>

//       <table className="history-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Type</th>
//             <th>Amount</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {user.transactions.map((txn, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{txn.type}</td>
//               <td>₹{txn.amount}</td>
//               <td>{txn.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <br />
//       <button className="danger" onClick={clearHistory}>
//         Clear History
//       </button>
//     </div>
//   );
// }

// export default History;

// 2

// import React from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import "./App.css";

// function History() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const clearHistory = () => {
//     user.transactions = [];
//     localStorage.setItem("user", JSON.stringify(user));
//     alert("Transaction History Cleared");
//     window.location.reload();
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(14);
//     doc.text("Transaction History", 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Name: ${user.name}`, 14, 22);
//     doc.text(`Account No: ${user.account}`, 14, 28);

//     const tableData = user.transactions.map((txn, index) => [
//       index + 1,
//       txn.type,
//       txn.amount,
//       txn.date,
//     ]);

//     autoTable(doc, {
//       head: [["#", "Type", "Amount", "Date"]],
//       body: tableData,
//       startY: 35,
//     });

//     doc.save("Transaction_History.pdf");


//     const downloadPDF = () => {
//   const doc = new jsPDF();

//   doc.setFontSize(14);
//   doc.text("Transaction History", 14, 15);

//   doc.setFontSize(10);
//   doc.text(`Name: ${user.name}`, 14, 22);
//   doc.text(`Account No: ${user.account}`, 14, 28);

//   autoTable(doc, {
//     head: [["#", "Type", "Amount", "Date"]],
//     body: user.transactions.map((txn, index) => [
//       index + 1,
//       txn.type,
//       txn.amount,
//       txn.date,
//     ]),
//     startY: 35,
//   });

//   doc.save("Transaction_History.pdf");
// };
//   };

//   if (!user || !user.transactions || user.transactions.length === 0) {
//     return (
//       <div className="container">
//         <h3>No Transactions Found</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <h2>Transaction History</h2>

//       <table className="history-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Type</th>
//             <th>Amount</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {user.transactions.map((txn, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{txn.type}</td>
//               <td>₹{txn.amount}</td>
//               <td>{txn.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
// <button onClick={downloadPDF}>Download PDF</button>
//       <br />
// {/* <button onClick={downloadPDF}>Download PDF</button> */}
//       {/* <button onClick={downloadPDF}>Download PDF</button> */}
//       <br /><br />
//       <button className="danger" onClick={clearHistory}>
//         Clear History
//       </button>
//     </div>
//   );
// }



// export default History;

// 3
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

function History() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.transactions || user.transactions.length === 0) {
    return (
      <div className="all-data-page">
        <h2 className="page-title">Transaction History</h2>
        <h3 style={{ textAlign: "center" }}>No Transactions Found</h3>
      </div>
    );
  }

  // 🔥 Latest first sort
  const sortedTransactions = [...user.transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const clearHistory = () => {
    user.transactions = [];
    localStorage.setItem("user", JSON.stringify(user));
    alert("Transaction History Cleared");
    window.location.reload();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Transaction History", 14, 15);
    doc.setFontSize(10);
    doc.text(`Name: ${user.name}`, 14, 22);
    doc.text(`Account No: ${user.account}`, 14, 28);

    const tableData = sortedTransactions.map((txn, index) => [
      index + 1,
      txn.name,
      txn.accountNumber,
      txn.type,
      `₹${txn.amount}`,
      formatDate(txn.date),
    ]);

    autoTable(doc, {
      head: [["#", "Name", "Account No", "Type", "Amount", "Date"]],
      body: tableData,
      startY: 35,
      styles: { halign: "center" },
      headStyles: { halign: "center" },
    });

    doc.save("Transaction_History.pdf");
  };

  return (
    <div className="all-data-page">
      <h2 className="page-title">Transaction History</h2>

      <table className="history-table full-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Account No</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((txn, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{txn.name}</td>
              <td>{txn.accountNumber}</td>
              <td>{txn.type}</td>
              <td>₹{txn.amount}</td>
              <td className="date-column">
                {formatDate(txn.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="history-actions">
        <button onClick={downloadPDF}>Download PDF</button>
        <button className="danger small-btn" onClick={clearHistory}>
  Clear History
</button>
      </div>
    </div>
  );
}

export default History;