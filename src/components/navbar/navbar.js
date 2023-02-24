import { FaChevronRight } from "react-icons/fa";
import { Navitem } from "./navitem";
import { Outlet } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import { AuthProvider } from "../../hooks";
import "./navbar.css";

const selectedStyle = {
  marginTop: "-0.18em",
  textDecoration: "underline",
  textDecorationColor: "#FDFFF1",
  textUnderlineOffset: "0.4em",
  transition: "0.15s"
};

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="navbar">
        <div className={"logo"}>
          <FaChevronRight
            className={"icon"}
            color="#FDFFF1"
            size="12"
            style={{ visibility: pathname === "/" ? "visible" : "hidden" }}
          />
          <p className={"title"}>
            <Link to="/">ORC</Link>
          </p>
        </div>

        <div className="right_nav">
          <Navitem
            selectedStyle={selectedStyle}
            navName={"motoristas"}
            routeName={"motoristas"}
            pathName={pathname}
          />
          <Navitem
            selectedStyle={selectedStyle}
            navName={"veículos"}
            routeName={"veiculos"}
            pathName={pathname}
          />
          <Navitem
            selectedStyle={selectedStyle}
            navName={"empresas"}
            routeName={"empresas"}
            pathName={pathname}
          />
        </div>
      </div>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}
