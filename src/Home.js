// import Bank from "./Images/Gemini.png";

// function Home() {
//   return (
//     <div className="mainpage">
//       {/* <h1>SRT Bank</h1> */}
//       <img src={Bank} alt="bank" width="200" />
//       {/* <p>Welcome to SRT Bank Application</p> */}
//     </div>
//   );
// }

// export default Home;

import { useEffect } from "react";
import Bank from "./Images/Gemini.png";
import "./App.css";

function Home() {

  useEffect(() => {
    document.body.classList.add("home-active");

    return () => {
      document.body.classList.remove("home-active");
    };
  }, []);

  return (
    <div className="mainpage">
      <img src={Bank} alt="bank" className="bank-logo" />
    </div>
  );
}

export default Home;