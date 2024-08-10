import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  
  const {cartItems,removeFromCart,getTotalCartAmount, products} = useContext(ShopContext);
  
  const checkout = async () => {
    const checkoutProducts = products.filter((product)=>
      cartItems[product.id]>0
    ).map((product)=>{
      return {
        ...product,
        quantity:cartItems[product.id]
      };
    })
    
    await fetch(`${backend_url}/checkout`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'auth-token': `${localStorage.getItem("auth-token")}`,
       },
       body: JSON.stringify(checkoutProducts),
     }).then((resp) => resp.json())
     alert("Successfully purchase!");
     window.location.replace('/');
      //  .then((data) => { dataObj = data });
  }
  

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <img className="cartitems-product-icon" src={backend_url+e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <p>{currency}{e.new_price}</p>
                      <button className="cartitems-quantity">{cartItems[e.id]}</button>
                      <p>{currency}{e.new_price*cartItems[e.id]}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={checkout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
