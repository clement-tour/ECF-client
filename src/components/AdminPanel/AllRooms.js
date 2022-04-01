import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";
import AddRoom from "./AddRoom";
import RoomManage from "./RoomManage";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      await fetch("/api/rooms/getallrooms")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((responseJson) => {
          // Do something with the response
          console.log(responseJson);
          setRooms(responseJson);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          setLoading(false);
        });
    }
    fetchRooms();
  }, []);

  const status = JSON.parse(localStorage.getItem("currentUser")).data.status;

  let roomsFilter = rooms;

  switch (status) {
    case "admin":
      roomsFilter = rooms;
      break;
    case "gérant Saint-Leu":
      roomsFilter = rooms.filter((room) => room.city === "Saint-Leu");
      break;
    case "gérant L'Hermitage":
      roomsFilter = rooms.filter((room) => room.city === "L'Hermitage");
      break;
    case "gérant La Saline":
      roomsFilter = rooms.filter((room) => room.city === "La Saline");
      break;
    case "gérant Lyon":
      roomsFilter = rooms.filter((room) => room.city === "Lyon");
      break;
    case "Nice":
      roomsFilter = rooms.filter((room) => room.city === "Nice");
      break;
    case "Bordeaux":
      roomsFilter = rooms.filter((room) => room.city === "Bordeaux");
      break;
    default:
      roomsFilter = rooms;
  }

  console.log(rooms);
  //console.log(bookings.data.length);
  return (
    <div className="row ">
      <AddRoom />
      <div className="col-md-12">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <div className="mt-3">
            <h2 className=" text-center">Liste des chambres</h2>
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Identifiant de la chambre</th>
                  <th>Nom</th>
                  <th>Ville</th>
                  <th>Prix par nuit</th>
                  <th>Nombre de place</th>
                  <th>Numéro de téléphone</th>
                  <th>Mise à jour</th>
                </tr>
              </thead>
              <tbody>
                {roomsFilter.map((room) => {
                  return <RoomManage key={room._id} room={room} />;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRooms;
