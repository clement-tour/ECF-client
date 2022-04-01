import React, { useEffect } from "react";
import { Tabs } from "antd";
import AllBookings from "../components/AdminPanel/AllBookings";
import AllRooms from "../components/AdminPanel/AllRooms";
import AllUsers from "../components/AdminPanel/AllUsers";
import AllHotels from "../components/AdminPanel/AllHotel";

const { TabPane } = Tabs;

const AdminScreen = () => {
  console.log(JSON.parse(localStorage.getItem("currentUser")).data.status);

  useEffect(() => {
    if (
      !(
        JSON.parse(localStorage.getItem("currentUser")).data.status ===
          "admin" ||
        JSON.parse(localStorage.getItem("currentUser")).data.status.includes(
          "gérant"
        )
      )
    ) {
      window.location.href = "/accueil";
    }
  }, []);

  return (
    <div className="m-4">
      {JSON.parse(localStorage.getItem("currentUser")).data.status ===
        "admin" && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Hôtels" key="1">
            <AllHotels />
          </TabPane>
          <TabPane tab="Chambres" key="2">
            <AllRooms />
          </TabPane>
          <TabPane tab="Utilisateurs" key="4">
            <AllUsers />
          </TabPane>
          <TabPane tab="Réservations" key="5">
            <AllBookings />
          </TabPane>
        </Tabs>
      )}
      {JSON.parse(localStorage.getItem("currentUser")).data.status.includes(
        "gérant"
      ) && (
        <Tabs defaultActiveKey="1">
          {/* <TabPane tab="Hôtels" key="1">
            <AllHotels />
          </TabPane> */}
          <TabPane tab="Chambres" key="2">
            <AllRooms />
          </TabPane>
          {/* <TabPane tab="Utilisateurs" key="4">
            <AllUsers />
          </TabPane> */}
          <TabPane tab="Réservations" key="5">
            <AllBookings />
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default AdminScreen;
