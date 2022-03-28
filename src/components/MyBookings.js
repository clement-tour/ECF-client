import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import classes from "./MyBookings.module.css";
import sweetAlert from "sweetalert2";
import { Tag } from "antd";

const MyBookings = () => {
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user.data._id);

  useEffect(() => {
    async function bookingsRooms() {
      try {
        setLoading(true);
        const data = await axios.post(
          "/api/bookings/getbookingsbyuserid",

          {
            userid: user.data._id,
          }
        );
        console.log(data);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    bookingsRooms();
  }, [user.data._id]);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid,
      });
      console.log(result);
      setLoading(false);
      sweetAlert
        .fire(
          "Félicitations !",
          "Votre réservation a bien été annulée",
          "success"
        )
        .then((result) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      sweetAlert.fire(
        "Oups !",
        "Une erreur s'est produite, merci de réessayer",
        "error"
      );
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loading />}
          {bookings &&
            bookings.data.map((booking) => {
              return (
                <div
                  className={`m-4 p-3 ${classes.boxShadow}`}
                  key={booking._id}
                >
                  <p>Nom de la chambre : {booking.room}</p>
                  <p>Numéro de la réservation : {booking._id}</p>
                  <p>Date d'arrivée : {booking.fromDate}</p>
                  <p>Date de départ : {booking.toDate}</p>
                  <p>Prix : {booking.totalAmount}</p>
                  <p>
                    Status de la réservation :{" "}
                    {booking.status === "booked" ? (
                      <Tag color="green">Confirmée</Tag>
                    ) : (
                      <Tag color="red">Annulée</Tag>
                    )}
                  </p>

                  {booking.status !== "cancelled" && (
                    <div className={classes.align}>
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          cancelBooking(booking._id, booking.roomid)
                        }
                      >
                        Annuler la réservation
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
