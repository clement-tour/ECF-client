import axios from "axios";
import React, { useState, useEffect } from "react";
import sweetAlert from "sweetalert2";
import Error from "./Error";
import Loading from "./Loading";

const AddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  async function addHotel() {
    const newHotel = {
      name,
      city,
      address,
      description,
    };
    console.log(newHotel);
    try {
      setLoading(true);
      const result = await axios.post("/api/hotels/addHotel", newHotel);
      console.log(result);
      setLoading(false);
      sweetAlert.fire(
        "Félicitations !",
        "Votre nouvelle chambre a bien été ajouté",
        "success"
      );
      //.then((result) => (window.location.href = "/accueil"));
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      sweetAlert.fire(
        "Oups !",
        "Une erreur s'est produite, merci de réessayer",
        "error"
      );
    }
  }
  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Nom"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              className="form-control mt-1"
              placeholder="Ville"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />

            <input
              type="text"
              className="form-control mt-1"
              placeholder="Adresse"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <input
              type="text"
              className="form-control mt-1"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div className="mt-1 text-right">
              <button className="btn btn-primary" onClick={addHotel}>
                Ajouter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddHotel;
