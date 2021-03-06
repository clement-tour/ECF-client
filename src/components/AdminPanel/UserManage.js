import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import sweetAlert from "sweetalert2";

AOS.init({ duration: 1000 });

const UserManage = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [status, setStatus] = useState(user.address);

  async function saveChanges() {
    const newuser = {
      userid: user._id,
      name,
      email,
      status,
    };
    try {
      setloading(true);

      const result = await axios.put("/api/users/modifyUser", newuser);
      setloading(false);
      sweetAlert
        .fire("Félicitations !", "L'hôtel a bien été modifié", "success")
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newuser);
  }

  async function handleDelete() {
    const newuser = {
      userid: user._id,
      name,
      email,
      status,
    };
    try {
      setloading(true);

      const result = await axios.post("/api/users/deleteuser", newuser);
      setloading(false);
      sweetAlert
        .fire("Félicitations !", "L'hôtel a bien été supprimé", "success")
        .then((result) => (window.location.href = "/admin"));
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
    console.log(newuser);
  }

  return (
    <tr key={user._id}>
      <td className="text-break">{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.status}</td>
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
          <Modal.Title>{user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={user.name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            defaultValue={user.email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
          />
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              console.log(e.target.value);
              setStatus(e.target.value);
            }}
          >
            <option value="visiteur">Visiteur</option>
            <option value="gérant Saint-Leu">Gérant Saint-Leu</option>
            <option value="gérant L'Hermitage">Gérant L'Hermitage</option>
            <option value="gérant La Saline">Gérant La Saline</option>
            <option value="gérant Lyon">Gérant Lyon</option>
            <option value="gérant Nice">Gérant Nice</option>
            <option value="gérant Bordeaux">Gérant Bordeaux</option>

            <option value="admin">Admin</option>
          </select>
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

export default UserManage;
