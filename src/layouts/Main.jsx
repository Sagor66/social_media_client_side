import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
