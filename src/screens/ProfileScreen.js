import React, { useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import MyBookings from "../components/MyBookings";

const { TabPane } = Tabs;

const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/connexion";
    }
  });

  return (
    <div className="m-4">
      <Tabs defaultActiveKey="2">
        <TabPane tab="Profil" key="1">
          <p>Nom : {user.data.name}</p>
          <p>Email : {user.data.email}</p>
          <p>Administrateur : {user.data.isAdmin ? " oui" : "non"}</p>
        </TabPane>
        <TabPane tab="Réservations" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
