import React, { useState, useEffect } from "react";
import classes from "./Room.module.css";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import sweetAlert from "sweetalert2";

AOS.init({ duration: 1000 });

const Hotel = ({ hotel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const [name, setName] = useState(hotel.name);
  const [city, setCity] = useState(hotel.city);
  const [address, setAddress] = useState(hotel.address);
  const [description, setDescription] = useState(hotel.description);

  async function saveChanges() {
    const newHotel = {
      hotelid: hotel._id,
      name,
      city,
      address,
      description,
    };
    try {
      setloading(true);
      const article = { name: name };

      const result = await axios.put("/api/hotels/addHotel", newHotel);
      setloading(false);
      sweetAlert
        .fire("Félicitations !", "L'hôtel a bien été modifié", "success")
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newHotel);
  }

  return (
    <tr key={hotel._id}>
      <td className="text-break">{hotel._id}</td>
      <td>{hotel.name}</td>
      <td>{hotel.city}</td>
      <td>{hotel.address}</td>
      <td>{hotel.description}</td>
      <td>
        {" "}
        <button className="btn btn-primary" onClick={handleShow}>
          Modifier
        </button>
      </td>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={hotel.name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={hotel.city}
            onChange={(e) => {
              console.log(e.target.value);
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={hotel.address}
            onChange={(e) => {
              console.log(e.target.value);
              setAddress(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={hotel.description}
            onChange={(e) => {
              console.log(e.target.value);
              setDescription(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default Hotel;
