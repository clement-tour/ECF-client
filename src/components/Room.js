import React, { useState } from "react";
import classes from "./Room.module.css";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Room = ({ room, fromDate, toDate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`row p-3 ${classes.boxShadow}`}>
      <div className="col-md-5">
        <img className={classes.smallImg} src={room.imageurls[0]} alt="room" />
      </div>
      <div className="col-md-7">
        <h1 className={classes.roomH1}>{room.name}</h1>
        <p>Nombre de lit : {room.maxcount}</p>
        <p>Téléphone : {room.phonenumber}</p>
        <p>Type : {room.type}</p>
        <div className={classes.float}>
          {fromDate && toDate && (
            <Link to={`/reservation/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-dark m-2">Réserver</button>
            </Link>
          )}
          <button className="btn btn-dark m-2" onClick={handleShow}>
            Détails
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item key={Math.random()}>
                  <img
                    className={`d-block w-100 ${classes.modalImg}`}
                    src={url}
                    alt={`Slide ${url}`}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
