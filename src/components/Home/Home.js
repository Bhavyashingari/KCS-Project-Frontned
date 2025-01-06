import React from "react";
import Navbar from "../Navbar/Navbar"
import Footer from '../Footer/Footer';
import Login from "../Login/Login";
import "./Home.css";

const Home=()=>{
    return (
      <div className="kcs-main-home">
        <Navbar/>
        <Login />
        <Footer/>
      </div>  
    );
};


export default Home;

