import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import sweetAlert from "sweetalert2";

AOS.init({ duration: 1000 });

const BookingManage = ({ booking }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const [room, setRoom] = useState(booking.room);
  const [fromDate, setfromDate] = useState(booking.fromDate);
  const [toDate, settoDate] = useState(booking.toDate);
  const [status, setstatus] = useState(booking.status);

  console.log(booking);

  async function saveChanges() {
    const newbooking = {
      bookingid: booking._id,
      roomid: booking.roomid,
      fromDate,
      toDate,
      status,
    };
    try {
      setloading(true);

      const result = await axios.put("/api/bookings/addbooking", newbooking);
      setloading(false);
      sweetAlert
        .fire(
          "Félicitations !",
          "La réservation a bien été modifiée",
          "success"
        )
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newbooking);
  }

  async function handleDelete() {
    const newbooking = {
      bookingid: booking._id,
      roomid: booking.roomid,
      room,
      fromDate,
      toDate,
      status,
    };
    try {
      setloading(true);

      const result = await axios.post(
        "/api/bookings/deletebooking",
        newbooking
      );
      setloading(false);
      sweetAlert
        .fire(
          "Félicitations !",
          "La réservation a bien été supprimée",
          "success"
        )
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newbooking);
  }

  return (
    <tr key={booking._id}>
      <td className="text-break">{booking._id}</td>
      <td className="text-break">{booking.userid}</td>
      <td>{booking.room}</td>
      <td>{booking.fromDate}</td>
      <td>{booking.toDate}</td>
      <td>{booking.status}</td>

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
          <Modal.Title>{booking.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={booking.room}
            onChange={(e) => {
              console.log(e.target.value);
              setRoom(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={booking.fromDate}
            onChange={(e) => {
              console.log(e.target.value);
              setfromDate(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={booking.toDate}
            onChange={(e) => {
              console.log(e.target.value);
              settoDate(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={booking.status}
            onChange={(e) => {
              console.log(e.target.value);
              setstatus(e.target.value);
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

export default BookingManage;
