import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Content1 from "./Content1";
import Hero from "./Hero";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import About from "./About";
import Download from "./Download";
import Navbar1 from "../components/Navbar1";
import Service from "./Service";
import Login from "../components/Login";
import AdminLogin from "../components/AdminLogin";

function Home() {
  const { section } = useParams();

  useEffect(() => {
    if (section) {
      // Find the element by ID and scroll to it
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section]);

  return (
    <div className="w-full overflow-x-hidden">
    <Navbar1 />
    <Hero />
    <section id="about" className="w-full"></section>
    <Banner />
    <section id="services" className="w-full"></section>
    <Service />
    <section id="team" className="w-full">
      <Freebook />
    </section>
    <section id="About" className="w-full"></section>
    <About />
    <Download />
    <Footer />
    <Login />
    <AdminLogin />
  </div>
  );
}

export default Home;
