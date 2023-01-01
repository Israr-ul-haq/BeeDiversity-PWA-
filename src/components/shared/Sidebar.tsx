import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import constants from "../../constants/constants";
import localStorageService from "../../services/LocalStorageService";

function Sidebar() {
  const navigate = useNavigate();

  function logout(event: SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();
    localStorageService.removeItem("BeeHiveUserData");
    navigate("/");
  }
  return (
    <>
      <div
        id="menu-main"
        data-menu-active="nav-homes"
        style={{ width: "280px" }}
        className="offcanvas offcanvas-start offcanvas-detached rounded-m"
      >
        <div
          className="card card-style bg-23 mb-3 rounded-m mt-3"
          data-card-height="60"
        >
          <div className="card-top m-3">
            <a
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                document.getElementById("menu-main")?.classList.remove("show");
                document
                  .getElementById("menu-main")
                  ?.classList.remove("visible");
              }}
              data-bs-dismiss="offcanvas"
              className="icon icon-xs bg-theme rounded-s color-theme float-end"
            >
              <i className="bi bi-caret-left-fill"></i>
            </a>
          </div>
        </div>

        <div className="bg-theme mx-3 rounded-m shadow-m mt-3 mb-3">
          <div className="d-flex px-2 pb-2 pt-2">
            <div></div>
            <div className="ps-2 align-self-center">
              <h5 className="ps-1 mb-0 line-height-xs pt-1">
                {JSON.parse(localStorage.getItem("BeeHiveUserData")!)?.user
                  ?.firstName +
                  " " +
                  JSON.parse(localStorage.getItem("BeeHiveUserData")!)?.user
                    ?.lastName}
              </h5>
              <h6 className="ps-1 mb-0 font-400 opacity-40">
                {
                  JSON.parse(localStorage.getItem("BeeHiveUserData")!)?.user
                    ?.role
                }
              </h6>
            </div>
            <div className="ms-auto">
              <div
                className="dropdown-menu  bg-transparent border-0 mt-n1 ms-3"
                id="dropdown"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  debugger;
                  document.getElementById("dropdown")?.classList.toggle("show");
                  document
                    .getElementById("dropdown")
                    ?.classList.add("drop_menu");
                }}
              >
                <div className="card card-style rounded-m shadow-xl mt-1 me-1">
                  <div className="list-group list-custom list-group-s list-group-flush rounded-xs px-3 py-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="menu-divider">NAVIGATION</span>
        <div className="menu-list">
          <div className="card card-style rounded-m p-3 py-2 mb-0">
            {JSON.parse(localStorage.getItem("BeeHiveUserData")!)?.user
              ?.role === "administrator" ? (
              <div>
                <Link to={"/home"}>
                  <div
                    id="nav-homes"
                    onClick={() => {
                      document
                        .getElementById("menu-main")
                        ?.classList.remove("show");
                      document
                        .getElementById("menu-main")
                        ?.classList.remove("visible");
                      document.querySelector(".offcanvas-backdrop ")?.remove();
                    }}
                  >
                    <i className="gradient-blue shadow-bg shadow-bg-xs bi bi-house-fill"></i>
                    <span>Homepage</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </Link>
                <Link to={"/beehives"}>
                  <div
                    id="nav-homes"
                    onClick={() => {
                      document
                        .getElementById("menu-main")
                        ?.classList.remove("show");
                      document
                        .getElementById("menu-main")
                        ?.classList.remove("visible");
                      document.querySelector(".offcanvas-backdrop ")?.remove();
                    }}
                  >
                    <i className="gradient-blue shadow-bg shadow-bg-xs bi bi-house-fill"></i>
                    <span>Beehouses</span>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to={"/home"}>
                <div
                  id="nav-homes"
                  onClick={() => {
                    document
                      .getElementById("menu-main")
                      ?.classList.remove("show");
                    document
                      .getElementById("menu-main")
                      ?.classList.remove("visible");
                    document.querySelector(".offcanvas-backdrop ")?.remove();
                  }}
                >
                  <i className="gradient-blue shadow-bg shadow-bg-xs bi bi-house-fill"></i>
                  <span>Homepage</span>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </Link>
            )}
          </div>
        </div>
        <a
          onClick={logout}
          className="color-theme opacity-70 list-group-item py-1"
          style={{
            marginTop: "25px",
            padding: "92px 26px",
            borderRadius: "29px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <strong className="font-500 font-12">Log Out</strong>
          <i className="bi bi-chevron-right"></i>
        </a>
      </div>
    </>
  );
}

export default Sidebar;
