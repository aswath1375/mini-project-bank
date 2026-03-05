// import { Link } from "react-router-dom";
// import "./App.css";

// function Navi() {
//   return (
//     <nav className="navbar">
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/Login">Login</Link></li>
//         <li><Link to="/Createacc">Create Account</Link></li>
//         <li><Link to="/Deposit">Deposit</Link></li>
//         <li><Link to="/Withdraw">Withdraw</Link></li>
//         <li><Link to="/Alldata">All Data</Link></li>
//         <li><Link to="/History">History</Link></li>
      
//       </ul>
//     </nav>
//   );
// }

// export default Navi;


import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Navi() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // remove login status
    alert("Logged out successfully");
    navigate("/"); // redirect to login page
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/createacc">Create Account</Link></li>
        <li><Link to="/deposit">Deposit</Link></li>
        <li><Link to="/withdraw">Withdraw</Link></li>
        <li><Link to="/alldata">All Data</Link></li>
        {/* <li><Link to="/history">History</Link></li> */}
        <li>
          // <button onClick={handleLogout} className="logout-btn">
          //   Logout
          // </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navi;

