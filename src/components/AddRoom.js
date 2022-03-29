import axios from "axios";
import React, { useState, useEffect } from "react";
import sweetAlert from "sweetalert2";
import Error from "./Error";
import Loading from "./Loading";

const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [type, settype] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");

  async function addRoom() {
    const newRoom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [image1, image2, image3],
    };
    console.log(newRoom);
    try {
      setLoading(true);
      const result = await axios.post("/api/rooms/addroom", newRoom);
      console.log(result);
      setLoading(false);
      sweetAlert
        .fire(
          "Félicitations !",
          "Votre nouvelle chambre a bien été ajouté",
          "success"
        )
        .then((result) => (window.location.href = "/accueil"));
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
              placeholder="Prix par nuit"
              value={rentperday}
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />

            <input
              type="text"
              className="form-control mt-1"
              placeholder="Nombre de place"
              value={maxcount}
              onChange={(e) => {
                setmaxcount(e.target.value);
              }}
            />

            <input
              type="text"
              className="form-control mt-1"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />

            <input
              type="text"
              className="form-control mt-1"
              placeholder="Numéro de téléphone"
              value={phonenumber}
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="type"
              value={type}
              onChange={(e) => {
                settype(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 1"
              value={image1}
              onChange={(e) => {
                setimage1(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 2"
              value={image2}
              onChange={(e) => {
                setimage2(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 3"
              value={image3}
              onChange={(e) => {
                setimage3(e.target.value);
              }}
            />
            <div className="mt-1 text-right">
              <button className="btn btn-primary" onClick={addRoom}>
                Ajouter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddRoom;
