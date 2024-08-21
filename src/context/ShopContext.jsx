import React, {createContext} from "react";
import all_products from '../components/Assets/all_products';

export const ShopContext=createContext(null);

const ShopContextProvider= (props) =>{
    console.log(all_products); 
    const contextValue = {all_products}

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>

    );
};
export default ShopContextProvider;