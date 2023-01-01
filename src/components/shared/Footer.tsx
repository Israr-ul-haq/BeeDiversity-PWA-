import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="footer-bar" className="footer-bar footer-bar-detached">
      {/* <a href="index-pages.html">
        <i className="bi bi-heart-fill font-15"></i>
        <span>Pages</span>
      </a> */}
      {/* <a href="index-components.html">
        <i className="bi bi-star-fill font-17"></i>
        <span>Features</span>
      </a> */}
      <Link to="/home" className="active-nav">
        <i className="bi bi-house-fill font-16"></i>
        <span>Home</span>
      </Link>
      {/* <a href="index-media.html">
        <i className="bi bi-image font-16"></i>
        <span>Media</span>
      </a> */}
      <a
        onClick={(e: SyntheticEvent) => {
          e.preventDefault();
          document.getElementById("menu-main")?.classList.add("show");
          document.getElementById("menu-main")?.classList.add("visible");
        }}
        data-bs-toggle="offcanvas"
        data-bs-target="#menu-main"
      >
        <i className="bi bi-list"></i>
        <span>Menu</span>
      </a>
    </div>
  );
}

export default Footer;
