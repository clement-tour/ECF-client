import React, { useState } from "react";
import "./Navbar.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function Navbarde() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/connexion";
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="/accueil">Groupe hôtelier Hypnos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/accueil">Accueil</Nav.Link>
              <NavDropdown title="Nos hôtels" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container className="justify-content-end">
          <ul className="navbar-nav justify-content-end m-2">
            {user ? (
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
                  <div>
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
                  </div>
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
        </Container>
      </Navbar>

      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                    <div>
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
                    </div>
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
      </nav> */}
    </header>
  );
}

export default Navbarde;
