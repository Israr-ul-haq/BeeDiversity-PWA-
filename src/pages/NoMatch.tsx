import { useEffect } from "react";
import { Link } from "react-router-dom";
import utitlities from "../utilities/utilities";

function NoMatch() {
  useEffect(() => {
    utitlities.cardExtender();
  });
  return (
    <div id="page">
      <div className="page-content mb-0 pb-0">
        <div
          className="card card-style mb-0 bg-transparent shadow-0 bg-11 mx-0 rounded-0"
          data-card-height="cover"
        >
          <div className="card-center">
            <div className="card card-style">
              <div className="content">
                <h1 className="font-800 font-45 mb-2 pt-4">404</h1>
                <p className="font-13 mt-n2 mb-3">Page Not Found</p>
                <p className="pt-2 mb-0">
                  The page cannot be located. <br /> Try refreshing or going
                  back home.
                </p>
                <Link to={`/`}>
                  <a
                    href="#"
                    data-back-button
                    className="btn rounded-sm btn-m gradient-red text-uppercase font-700 mt-4 mb-3 shadow-bg shadow-bg-s"
                  >
                    Go Back
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
