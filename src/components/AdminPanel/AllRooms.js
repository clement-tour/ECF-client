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
                  <th>Type</th>
                  <th>Prix par nuit</th>
                  <th>Nombre de place</th>
                  <th>Numéro de téléphone</th>
                  <th>Mise à jour</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => {
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
