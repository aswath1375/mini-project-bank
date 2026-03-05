import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully");
    navigate("/");
  };

  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;