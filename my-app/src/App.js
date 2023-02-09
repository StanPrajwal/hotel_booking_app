
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register"
import LandingPage from "./Components/LandingPage/Landingpage"
import { useState } from "react";
import HotailerView from "./Components/Hotailer/Dashboard";
import Userorder from "./Components/Rooms/UserOrder";
import Bookings from "./Components/Hotailer/Bookings";
import AddHotels from "./Components/Hotailer/Addhotels";
import { Country, State, City } from 'country-state-city';
import Card from "./Components/Rooms/RoomsCard";
import ViewDetails from "./Components/Rooms/ViewDetails";
import { PrivateRoute, PrivateRouteforHotel } from "./ProctedRoute";
export default function App() {
  const Countries = Country.getAllCountries()

  return (<>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/view-more" element={<ViewDetails />} />
        <Route path="/userorder" element={<Userorder />} />
      </Route>
      <Route path="/" element={<Card />} />
      {/* <Route path="/" element={<LandingPage/>}/> */}
      <Route element={<PrivateRouteforHotel />}>
        <Route path="/addhotels" element={<AddHotels Countries={Countries} />} />
        <Route path="/bookings" element={<Bookings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/hotel" element={<HotailerView />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  </>
  )
}