import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
        const [menu,setMenu] = useState("Home");
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
        </div>
        <div>
          <ul className='nav-menu'>
            <li onClick={()=>{setMenu("Home")}}><Link to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("T-shirt")}}><Link to='/T-shirt'>T-shirt</Link>{menu==="T-shirt"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Jeans")}}><Link to='/Jeans'>Jeans</Link>{menu==="Jeans"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Shoes")}}><Link to='/Shoes'>Shoes</Link>{menu==="Shoes"?<hr/>:<></>}</li>
          </ul>
        </div>
        <div className='nav-cart-login'>
          <Link to='/login'><button>Login</button></Link>
          <Link to='/Cart'><img src={cart} alt="" /></Link>
          <div className='nav-cart-count'>0</div>
        </div>
    </div>
  )
}

export default Navbar