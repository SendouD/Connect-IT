import React from "react";
import tickMarkImage from "./images/a.jpeg";

function Header() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-6"></div>
          <div className="col-6 d-flex justify-content-end ">
            <div className="m-1 ml-auto mt-2">
              {" "}
              {/* Added mt-2 for top margin */}
              <button
                type="button"
                className="btn btn-light"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                Sign Up
                <img
                  src={tickMarkImage}
                  alt="Tick Mark"
                  style={{ marginLeft: "5px", width: "20px", height: "20px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
