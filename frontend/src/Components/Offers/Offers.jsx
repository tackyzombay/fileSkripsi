import React, { useState } from "react";
import "./Offers.css";
import exclusive_image from "../Assets/jual-beli-3.jpg";
import { Link } from "react-router-dom";

const Offers = () => {
  let [menu,setMenu] = useState("shop");

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Hanya terdapat disini</h1>
        <h1></h1>
        <p>Tempat jual beli barang dari agen tunggal</p>
        <Link to='/items' style={{ textDecoration: 'none' }}><button onClick={()=>{setMenu("mens")}}>Cek Produk{menu==="mens"?<hr/>:<></>}</button></Link>
        {/* <a onClick={()=>{setMenu("mens")}}><Link to='/items' style={{ textDecoration: 'none' }}>Product</Link>{menu==="mens"?<hr/>:<></>}</a> */}
      </div>
      <div className="offers-right">
        
        <img src={exclusive_image} alt=""></img>
        
      </div>
    </div>
  );
};

export default Offers;
