import React, { useState } from "react";
import axios from "axios";
import "./RegisterScreen.css";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";
import sweetAlert from "sweetalert2";

const RegisterScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
      };
      try {
        setloading(true);
        const result = await axios.post("/api/users/register", user);
        setloading(false);
        setsuccess(true);

        setemail("");
        setname("");
        setcpassword("");
        setpassword("");
        sweetAlert
          .fire(
            "Félicitations !",
            "Votre inscription a été réalisée avec succès",
            "success"
          )
          .then((result) => (window.location.href = "/connexion"));
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
        sweetAlert.fire("Oups...", "Une erreur s'est produite", "error");
      }
      console.log(user);
    } else {
      alert("Les mots de passe ne sont pas identiques");
    }
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
        {loading && <Loading />}
        {success && (
          <Success message="L'inscription a été réalisée avec succès" />
        )}
        {error && <Error message="Cette adresse email est déjà utilisée" />}

        <h2 id="title">Inscription</h2>
        <div>
          <input
            id="name"
            required
            type="text"
            placeholder="name"
            className="form-control mt-1"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            id="mail"
            required
            type="email"
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
          <input
            id="cpassword"
            type="password"
            placeholder="confirm password"
            className="form-control mt-1"
            value={cpassword}
            required
            onChange={(e) => {
              setcpassword(e.target.value);
            }}
          />
          <button
            onClick={register}
            className="btn btn-dark rounded-pill mt-3 mb-3"
          >
            S'inscrire
          </button>
          <br />
          <a style={{ color: "black" }} href="/connexion">
            Click Here To Login
          </a>
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
