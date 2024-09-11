import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import cart_icon from '../../assets/cart.png'
import product_list from '../../assets/product-list.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={cart_icon} alt=""/>
                <p>Add Product</p>

            </div>
        </Link>
        <Link to='/listproduct' style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={product_list} alt=""/>
                <p>Product List</p>

            </div>
        </Link>


    </div>
  )
}

export default Sidebar