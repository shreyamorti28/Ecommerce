import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart from '../Assets/cart.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../Assets/dropdown.png';


const Navbar = () => {
  const location = useLocation();
  const { getTotalCartItems } = useContext(ShopContext);
  const menuref = useRef();

  const dropdown_toggle = (e) => {
    // Toggle the class on the menu element
    if (menuref.current.classList.contains('nav-menu-visible')) {
      menuref.current.classList.remove('nav-menu-visible');
      e.target.classList.remove('open');
    } else {
      menuref.current.classList.add('nav-menu-visible');
      e.target.classList.add('open');
    }
  };
  const isActive = (path) => location.pathname === path;
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown Icon" />
      <div>
        <ul ref={menuref} className='nav-menu'>
          <li className={isActive("/") ? "active-menu" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive("/T-shirt") ? "active-menu" : ""}>
            <Link to="/T-shirt">T-shirt</Link>
          </li>
          <li className={isActive("/Jeans") ? "active-menu" : ""}>
            <Link to="/Jeans">Jeans</Link>
          </li>
          <li className={isActive("/Shoes") ? "active-menu" : ""}>
            <Link to="/Shoes">Shoes</Link>
          </li>
        </ul>
      </div>
      <div className='nav-cart-login'>
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
          : <Link to='/login'><button>Login</button></Link>}

        <Link to='/Cart'><img src={cart} alt="Cart" /></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
