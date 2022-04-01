import React, { useEffect } from "react";
import { Tabs } from "antd";
import AllBookings from "../components/AllBookings";
import AllRooms from "../components/AdminPanel/AllRooms";
import AllUsers from "../components/AdminPanel/AllUsers";
import AddRoom from "../components/AdminPanel/AddRoom";
import AddHotel from "../components/AdminPanel/AddHotel";
import AllHotels from "../components/AdminPanel/AllHotel";

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
    </div>
  );
};

export default AdminScreen;
