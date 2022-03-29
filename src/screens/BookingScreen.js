import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./BookingScreen.module.css";

import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import sweetAlert from "sweetalert2";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1000 });

const BookingScreen = () => {
  let { roomid, fromDate, toDate } = useParams();

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fromDateMoment = moment(fromDate, "DD-MM-YYYY");
  const toDateMoment = moment(toDate, "DD-MM-YYYY");

  const totalDays = moment.duration(toDateMoment.diff(fromDateMoment)).asDays();
  const totalAmount = room.rentperday * totalDays;

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/connexion";
    }

    async function postRoom() {
      try {
        setLoading(true);
        const data = await (
          await axios.post("/api/rooms/getroombyid", { roomid })
        ).data;
        console.log(data);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }
    postRoom();
  }, [roomid]);

  async function bookRoom() {
    const bookingDetails = {
      room: room,
      userid: JSON.parse(localStorage.getItem("currentUser")).data._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
    };

    console.log(JSON.parse(localStorage.getItem("currentUser")).data._id);

    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      sweetAlert
        .fire("Félicitations !", "Votre chambre a bien été réservée", "success")
        .then((result) => (window.location.href = "/profil"));
    } catch (error) {
      setLoading(false);
      sweetAlert.fire("Oups...", "Une erreur s'est produite", "error");
    }
  }

  return (
    <div className="container m-5" data-aos="flip-left">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message="Une erreur est survenue, merci de réessayer ultérieurement" />
      ) : (
        <div className={`row justify-content-center mt-5 ${classes.boxShadow}`}>
          <div className="col-md-5"></div>
          <h1>{room.name}</h1>
          <img src={room.imageurls[0]} alt={Math.random()} className=""></img>
          <div className="col-md-5"></div>
          <div className={classes.textAlignRight}>
            <h1>Détails de la réservation</h1>
            <p>
              Nom : {JSON.parse(localStorage.getItem("currentUser")).data.name}
            </p>
            <p>Du : {fromDate}</p>
            <p> Au : {toDate}</p>
            <p>Nombre de personne : {room.maxcount}</p>
          </div>

          <div className={classes.textAlignRight}>
            <h2>Montant de la réservation</h2>
            <p> Nombre de nuits : {totalDays} </p>
            <p> Prix par nuit : {room.rentperday}</p>
            <p> Montant total : {totalAmount}</p>
          </div>

          <div className={classes.textAlignRight}>
            <button className="btn btn-dark" onClick={bookRoom}>
              Réserver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;

// import React, { useState, useEffect } from "react";
// import classes from "./BookingScreen.module.css";

// const BookingScreen = () => {
//   const [room, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchRooms() {
//       setLoading(true);
//       await fetch("/api/rooms/getroombyid")
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           }
//           throw new Error("Something went wrong");
//         })
//         .then((responseJson) => {
//           // Do something with the response
//           console.log(responseJson);
//           setRooms(responseJson);
//           setLoading(false);
//         })
//         .catch((error) => {
//           setError(true);
//           console.log(error);
//           setLoading(false);
//         });
//     }

//     fetchRooms();
//   }, []);

//   return (
//     <div className="container m-5">
//       {loading ? (
//         <h1>Loading...</h1>
//       ) : error ? (
//         <h1>Error...</h1>
//       ) : (
//         <div className={`row justify-content-center mt-5 ${classes.boxShadow}`}>
//           <div className="col-md-5"></div>
//           <h1>{room.name}</h1>
//           <img src={room.imageurls[0]} alt={Math.random()} className=""></img>
//           <div className="col-md-5"></div>
//           <div className={classes.textAlignRight}>
//             <h1>Détails de la réservation</h1>
//             <p>Nom :</p>
//             <p>Du :</p>
//             <p> Au :</p>
//             <p>Nombre de personne : {room.maxcount}</p>
//           </div>

//           <div className={classes.textAlignRight}>
//             <h2>Montant de la réservation</h2>
//             <p> Nombre de jours : </p>
//             <p> Prix par nuit : {room.rentperday}</p>
//             <p> Montant total :</p>
//           </div>

//           <div className={classes.float}>
//             <button className="btn btn-primary">Réserver</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingScreen;
