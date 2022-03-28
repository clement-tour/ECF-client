import React, { useState, useEffect } from "react";
import axios from "axios";

import "./LoginScreen.css";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/accueil";
    }
  }, []);

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = await axios.post("/api/users/login", user);
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/accueil";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(user);
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
        {loading && <Loading />}
        {error && <Error message="Email ou mot de passe incorrect" />}
        <h2 id="title">Connexion</h2>
        <div>
          <input
            id="mail"
            required
            type="mail"
            placeholder="email"
            className="form-control mt-1"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            id="password"
            type="password"
            placeholder="password"
            className="form-control mt-1"
            value={password}
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <button
            onClick={login}
            className="btn btn-dark rounded-pill mt-3 mb-3"
          >
            Se connecter
          </button>
          <br />
          <a style={{ color: "black" }} href="/inscription">
            Click Here To Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
