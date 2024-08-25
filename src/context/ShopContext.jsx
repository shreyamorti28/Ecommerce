import React, {createContext, useState} from "react";
import all_products from '../components/Assets/all_products';

export const ShopContext=createContext(null);
const getDefaultCart=()=>{
    let cart={};
    for (let index=0; index<all_products.length; index++){
        cart[index]=0;
    }
    return cart;

}

const ShopContextProvider= (props) =>{
    const [cartItems,setCartItems]=useState(getDefaultCart());
    

    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }
    const RemoveFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let iteminfo=all_products.find((product)=>product.id===Number(item))
                totalAmount+=iteminfo.new_price*cartItems[item];
            }
            
        }
        return totalAmount;
    }
    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+=cartItems[item];
            }

        }
        return totalItem;
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount,all_products,cartItems,addToCart,RemoveFromCart};

    

    

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    );
};
export default ShopContextProvider;