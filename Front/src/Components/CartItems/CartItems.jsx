import "./CartItems.css";
import { useEffect, useState, Link, useContext } from 'react';
import axios from 'axios';
import remove_icon from '../../../public/removeicon.png';
import { hostname } from "../../assets/globalVars";
import { ShopContext } from '../../Context/ShopContext';
import { ProductContext } from "../../Context/ProductContext";


const CartItems = () => {
  const {
    getTotalCartAmount,
    cartItems,
    removeFromCart, 
    clearCart,
    addToCart
  } = useContext(ShopContext);
const {products} = useContext(ProductContext);
console.log(products);
  return (
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Product</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add/Remove</p>
        </div>
        <hr />
          {Array.isArray(products) && cartItems.map((cartItem) => {
            const product = products.find((product) => product.id === cartItem.productID);
            console.log("Prodict ID:", cartItem.productID, "Matched product", product);
            return (
              <div key={cartItem.productID}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={product.imgPath} alt="" className="carticon-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <p>{cartItem.quantity}</p>
                  <p>{product.price * cartItem.quantity}</p>
                  <div className="cartitems-format button-container">
                    <button onClick={() => addToCart(cartItem.productID)}>+</button>
                    <button onClick={() => removeFromCart(cartItem.productID)}>-</button>
                  </div>
                </div>
              </div>
            );})}
          <hr />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
        </div>
        <div className="cartitems-payment">
          <p>Personal Details</p>
          <div className="cartitems-paymentbox">
            <input type="text" placeholder="Mobile Number" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Credit Card Number" />
            <hr />
              <button
                onClick={() => {
                  clearCart();
                  alert("Your order has been completed successfully");
                }}
              >
                Checkout
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
