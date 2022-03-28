import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/accueil" element={<HomeScreen />} />
        <Route
          path="/reservation/:roomid/:fromDate/:toDate"
          element={<BookingScreen />}
        />
        <Route path="/inscription" element={<RegisterScreen />} />
        <Route path="/connexion" element={<LoginScreen />} />
        <Route path="/profil" element={<ProfileScreen />} />
      </Routes>
    </div>
  );
}

export default App;
