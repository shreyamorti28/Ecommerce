import React from 'react'

const Item = (props) => {
  return (
    <div className='item'>
        <img className='item-image' src={props.image} alt=""/>
        <p>{props.name}</p>
        <div className='item-prices'>
            <div className='item-price-new'>
                ${props.new_price}
            </div>

        </div>
    </div>
  )
}

export default Item 