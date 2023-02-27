import { FaChevronRight } from "react-icons/fa";
import { Navitem } from "./navitem";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import { AuthProvider } from "../../hooks";

import "./navbar.css";
import { useEffect } from "react";

const selectedStyle = {
  marginTop: "-0.18em",
  textDecoration: "underline",
  textDecorationColor: "#FDFFF1",
  textUnderlineOffset: "0.4em",
  transition: "0.15s"
};

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/home");
    }
  }, [navigate, pathname]);
  return (
    <>
      <AuthProvider>
        {pathname !== "/login" && (
          <div className="navbar">
            <div className={"logo"}>
              <FaChevronRight
                className={"icon"}
                color="#FDFFF1"
                size="12"
                style={{ visibility: pathname === "/home" ? "visible" : "hidden" }}
              />
              <p className={"title"}>
                <Link to="/home">ORC</Link>
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
              <Navitem
                selectedStyle={selectedStyle}
                navName={"rotas"}
                routeName={"rotas"}
                pathName={pathname}
              />
            </div>
          </div>
        )}

        <Outlet />
      </AuthProvider>
    </>
  );
}
