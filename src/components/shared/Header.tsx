import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header-bar header-fixed header-app header-bar-detached">
        <a
          onClick={(e: SyntheticEvent) => {
            e.preventDefault();
            document.getElementById("menu-main")?.classList.add("show");
            document.getElementById("menu-main")?.classList.add("visible");
          }}
          data-bs-toggle="offcanvas"
          data-bs-target="#menu-main"
        >
          <i className="bi bi-list color-theme"></i>
        </a>
        <Link to="/home" className="header-title color-theme">
          <img
            src="../images/logo_beediversity.svg"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />{" "}
        </Link>
      </div>
    </>
  );
}

export default Header;
