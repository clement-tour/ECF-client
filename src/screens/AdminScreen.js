import React, { useEffect } from "react";
import { Tabs } from "antd";
import AllBookings from "../components/AllBookings";
import AllRooms from "../components/AllRooms";
import AllUsers from "../components/AllUsers";
import AddRoom from "../components/AddRoom";
import AddHotel from "../components/AddHotel";
import AllHotels from "../components/AllHotel";

const { TabPane } = Tabs;

const AdminScreen = () => {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).data.isAdmin) {
      window.location.href = "/accueil";
    }
  }, []);

  return (
    <div className="m-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Réservations" key="1">
          <AllBookings />
        </TabPane>
        <TabPane tab="Chambres" key="2">
          <AllRooms />
        </TabPane>
        <TabPane tab="Ajouter une chambre" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Utilisateurs" key="4">
          <AllUsers />
        </TabPane>
        <TabPane tab="Hôtels" key="5">
          <AllHotels />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
