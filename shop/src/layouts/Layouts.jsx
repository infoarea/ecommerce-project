import { Outlet } from "react-router-dom";
import Footer from "./footer/footer";
import Header from "./header/header";

const Layouts = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layouts;
