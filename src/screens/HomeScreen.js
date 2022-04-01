import React, { useState, useEffect } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Room from "../components/Room";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import classes from "./HomeScreen.module.css";

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { RangePicker } = DatePicker;
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [roomsCopy, setRoomsCopy] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [city, setCity] = useState("all");

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
          setRoomsCopy(responseJson);
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

  const filterByDate = (dates) => {
    console.log(moment(dates[0]).format("DD-MM-YYYY"));
    console.log(moment(dates[1]).format("DD-MM-YYYY"));

    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    var temp = [];
    for (const room of roomsCopy) {
      var availability = false;

      console.log(roomsCopy);

      for (const booking of room.currentbookings) {
        if (room.currentbookings.length > 0) {
          if (
            !moment(dates[0].format("YYYY-MM-DD")).isBetween(
              moment(booking.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
              moment(booking.toDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
              "day",
              "[)"
            ) &&
            !moment(dates[1].format("YYYY-MM-DD")).isBetween(
              moment(booking.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
              moment(booking.toDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
              "day",
              "(]"
            )
          ) {
            if (
              !moment(dates[0].format("YYYY-MM-DD")).isBefore(
                moment(booking.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD")
              ) ||
              !moment(dates[1].format("YYYY-MM-DD")).isAfter(
                moment(booking.toDate, "DD-MM-YYYY").format("YYYY-MM-DD")
              )
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability || room.currentbookings.length === 0) {
        temp.push(room);
        console.log("ok");
      }
      console.log(temp);
      setRooms(temp);
    }
  };

  const filterBySearch = () => {
    console.log(roomsCopy);
    console.log(roomsCopy[0].name);
    const tempRooms = roomsCopy.filter((room) =>
      room.name
        .toString()
        .toLowerCase()
        .includes(searchKey.toString().toLowerCase())
    );

    console.log(tempRooms);

    setRooms(tempRooms);
  };

  const filterByCity = (e) => {
    console.log(e);
    console.log(e.target.value);
    setCity(e.target.value);
    if (e.target.value !== "all") {
      const tempRooms = roomsCopy.filter(
        (room) =>
          room.city.toString().toLowerCase() ===
          e.target.value.toString().toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(roomsCopy);
    }
  };

  return (
    <div className="container">
      <div
        className={`row justify-content-center mt-5 p-3 ${classes.boxShadow}`}
      >
        <div className="col-sm-4">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          ></input>
        </div>
        <div className="col-sm-4">
          <select className="form-select" value={city} onChange={filterByCity}>
            <option value="all">Destination</option>
            <option value="Saint-Leu">Saint-Leu</option>
            <option value="L'Hermitage">L'Hermitage</option>
            <option value="La Saline">La Saline</option>
            <option value="Lyon">Lyon</option>
            <option value="Nice">Nice</option>
            <option value="Bordeaux">Bordeaux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5 ">
        {loading ? (
          <Loading />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-4" key={room._id}>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;
