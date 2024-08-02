import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'

const Navbar = () => {
        const [menu,setMenu] = useState("Home");
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
        </div>
        <div>
          <ul className='nav-menu'>
            <li onClick={()=>{setMenu("Home")}}>Home{menu==="Home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("T-shirt")}}>T-shirt{menu==="T-shirt"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Jeans")}}>Jeans{menu==="Jeans"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Jackets")}}>Jackets{menu==="Jackets"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Shoes")}}>Shoes{menu==="Shoes"?<hr/>:<></>}</li>
          </ul>
        </div>
        <div className='nav-cart-login'>
          <button>Login</button>
          <img src={cart} alt="" />
          <div className='nav-cart-count'>0</div>
        </div>
    </div>
  )
}

export default Navbar