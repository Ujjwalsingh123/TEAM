import React from "react";
import Footer from "../components/Footer";
import Hero from "../Home/Hero";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import ExplorePage from "./ExplorePage";

function UserHome() {
  return (
    <>
      <Navbar1 />
      {/* <Hero /> */}
      <ExplorePage />
      <Footer />
    </>
  );
}

export default UserHome;
