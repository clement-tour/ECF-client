import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/connexion";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/accueil">
          Groupe hôtelier Hypnos
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav ">
            {user ? (
              // <p style={{ color: "white" }}>{user.data.name}</p>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle me-5"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle m-1"></i>

                  {user.data.name}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="/profil">
                      Profil
                    </a>
                  </li>
                  <li>
                    {JSON.parse(localStorage.getItem("currentUser")).data
                      .status === "admin" && (
                      <li>
                        <a className="dropdown-item" href="/admin">
                          Administration
                        </a>
                      </li>
                    )}
                    {JSON.parse(
                      localStorage.getItem("currentUser")
                    ).data.status.includes("gérant") && (
                      <li>
                        <a className="dropdown-item" href="/admin">
                          Administration
                        </a>
                      </li>
                    )}
                    <li>
                      <a className="dropdown-item" href="#" onClick={logout}>
                        Se déconnecter
                      </a>
                    </li>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link "
                    aria-current="page"
                    href="/inscription"
                  >
                    Inscription
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/connexion">
                    Connexion
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
