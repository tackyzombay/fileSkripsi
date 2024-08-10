import React from "react";
import "./Hero.css";
import hero_image from "../Assets/jual-beli-2.jpg";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2> </h2>
        <div>
          <div className="hero-hand-icon">
            <p>Dari agen tunggal</p>
          </div>
          <p>untuk</p>
          <p>masyarakat</p>
        </div>
        
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
