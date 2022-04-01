import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import sweetAlert from "sweetalert2";

AOS.init({ duration: 1000 });

const RoomManage = ({ room }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const [name, setName] = useState(room.name);
  const [city, setCity] = useState(room.city);
  const [rentperday, setRentperday] = useState(room.rentperday);
  const [maxcount, setMaxcount] = useState(room.maxcount);

  const [phonenumber, setPhonenumber] = useState(room.phonenumber);

  async function saveChanges() {
    const newroom = {
      roomid: room._id,
      name,
      city,
      rentperday,
      maxcount,
      phonenumber,
    };
    try {
      setloading(true);

      const result = await axios.put("/api/rooms/addroom", newroom);
      setloading(false);
      sweetAlert
        .fire("Félicitations !", "La chambre a bien été modifiée", "success")
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newroom);
  }

  async function handleDelete() {
    const newroom = {
      roomid: room._id,
      name,
      city,
      rentperday,
      maxcount,
      phonenumber,
    };
    try {
      setloading(true);

      const result = await axios.put("/api/rooms/deleteroom", newroom);
      setloading(false);
      sweetAlert
        .fire("Félicitations !", "La chambre a bien été supprimée", "success")
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newroom);
  }
  return (
    <tr key={room._id}>
      <td className="text-break">{room._id}</td>
      <td>{room.name}</td>
      <td>{room.city}</td>
      <td>{room.rentperday}</td>
      <td>{room.maxcount}</td>
      <td>{room.phonenumber}</td>
      <td>
        {" "}
        <button className="btn btn-primary m-1" onClick={handleShow}>
          Modifier
        </button>
        <button className="btn btn-primary m-1" onClick={handleDelete}>
          Supprimer
        </button>
      </td>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={room.name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={room.city}
            onChange={(e) => {
              console.log(e.target.value);
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={room.rentperday}
            onChange={(e) => {
              console.log(e.target.value);
              setRentperday(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={room.maxcount}
            onChange={(e) => {
              console.log(e.target.value);
              setMaxcount(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={room.phonenumber}
            onChange={(e) => {
              console.log(e.target.value);
              setPhonenumber(e.target.value);
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

export default RoomManage;
