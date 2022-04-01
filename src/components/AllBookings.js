import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";
import BookingManage from "./BookingManage";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      await fetch("/api/bookings/getallbookings")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((responseJson) => {
          // Do something with the response
          console.log(responseJson);
          setBookings(responseJson);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          setLoading(false);
        });
    }
    fetchBookings();
  }, []);

  console.log(bookings);
  //console.log(bookings.data.length);
  return (
    <div className="row ">
      <div className="col-12 ">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Numéro de la réservation</th>
                <th>Identifiant de l'utilisateur</th>
                <th>Chambre</th>
                <th>Date d'arrivée</th>
                <th>Date de départ</th>
                <th>Status</th>
                <th>Mise à jour</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                return <BookingManage key={booking._id} booking={booking} />;
              })}
              {/* {bookings.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td className="text-break">{booking._id}</td>
                    <td className="text-break">{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllBookings;
