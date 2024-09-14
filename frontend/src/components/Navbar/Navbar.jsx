import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart from '../Assets/cart.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../Assets/dropdown.png';
import tshirtImg from '../Assets/White_tshirt.jpg'; // Example image for T-shirt
import jeansImg from '../Assets/baggy_jeans2.png';  // Example image for Jeans
import shoesImg from '../Assets/Trek_shoes.png';  // Example image for Shoes

const Navbar = () => {
    const [menu, setMenu] = useState("Home");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuref = useRef();

    const dropdown_toggle = (e) => {
        menuref.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Logo" />
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown Icon" />
            <div>
                <ul ref={menuref} className='nav-menu'>
                    <li onClick={() => { setMenu("Home") }}>
                        <Link to='/'>Home</Link>
                        {menu === "Home" ? <hr /> : null}
                    </li>
                    <li onClick={() => { setMenu("T-shirt") }}>
                        <Link to='/T-shirt'>T-shirt</Link>
                        {menu === "T-shirt" ? <hr /> : null}
                        <div className="dropdown-content">
                            <img src={tshirtImg} alt="T-shirt" />
                            <p>Discover our collection of stylish T-shirts.</p>
                        </div>
                    </li>
                    <li onClick={() => { setMenu("Jeans") }}>
                        <Link to='/Jeans'>Jeans</Link>
                        {menu === "Jeans" ? <hr /> : null}
                        <div className="dropdown-content">
                            <img src={jeansImg} alt="Jeans" />
                            <p>Find your perfect fit with our range of jeans.</p>
                        </div>
                    </li>
                    <li onClick={() => { setMenu("Shoes") }}>
                        <Link to='/Shoes'>Shoes</Link>
                        {menu === "Shoes" ? <hr /> : null}
                        <div className="dropdown-content">
                            <img src={shoesImg} alt="Shoes" />
                            <p>Step up your style with our selection of shoes.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='nav-cart-login'>
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button>Login</button></Link>}
                
                <Link to='/Cart'><img src={cart} alt="Cart" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
