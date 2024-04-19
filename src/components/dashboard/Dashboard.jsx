import React, { useState } from "react";
import "./Dashboard.css";
import eLogo from "../../../src/assets/elogo.svg";
import UploadPopUp from "../modal/UploadPopUp";
import Report from "../report/Report";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 justify-content-between fixed-top shadow">
          <div className="flex-grow-1">
            <a className="navbar-brand" href="#">
              <img
                className="img-fluid"
                style={{ maxWidth: "32px", maxHeight: "32px" }}
                src={eLogo}
                alt="logo"
              />
            </a>
          </div>
          <div ><UploadPopUp /></div>
          <div className="d-block">
            <button className="btn p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-x text-gray-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.854 3.146a.5.5 0 0 1 .708 0L8 7.293l3.646-3.647a.5.5 0 1 1 .708.708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 0-.708z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-list text-gray-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 4.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
        <div
          className={`${
            isOpen
              ? "width-sidebar visible position-fixed mt-4 bg-smoke-white min-vh-100"
              : "d-none"
          }`}
        >
          <div className=" col-auto col-md-3 min-vh-100">
            <a
              className="text-decoration-none text-white d-flex align-items-center"
              href="#"
            >
              <i className="fs-4 bi bi-speedometer"></i>
              <span className="ms-1 fs-4">Brand</span>
            </a>
            <ul className="nav flex-column mt-3 ">
              <li className="nav-item">
                <a href="#" className="nav-link active" aria-current="page"></a>
              </li>
              <li className="nav-item d-flex align-items-center bg-secondary rounded-pill py-1 px-3">
                <span className="me-3 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M2 20h20v2H2zm4-4h4v4H6zm6-8h4v12h-4zm6-4h4v16h-4z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <button className="btn btn-primary text-white bg-transparent border-0">
                  Report
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className={`${isOpen ? 'centered-report-1' : 'centered-report-2'}`}>
        <Report />
      </div>
    </>
  );
}

export default Dashboard;
