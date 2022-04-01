import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Error from "../Error";
import HotelManage from "./HotelManage";
import AddHotel from "./AddHotel";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      await fetch("/api/hotels/getallhotels")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((responseJson) => {
          // Do something with the response
          console.log(responseJson);
          setHotels(responseJson);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          setLoading(false);
        });
    }
    fetchHotels();
  }, []);

  console.log(hotels);

  //console.log(bookings.data.length);
  return (
    <div className="row ">
      <AddHotel />
      <div className="col-md-12">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <div className="mt-3">
            <h2 className=" text-center">Liste des hôtels</h2>
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>Identifiant de l'hôtel</th>
                  <th>Nom</th>
                  <th>Ville</th>
                  <th>Addresse</th>
                  <th>Description</th>
                  <th>Mise à jour</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => {
                  return <HotelManage key={hotel._id} hotel={hotel} />;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHotels;
