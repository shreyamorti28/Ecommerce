import p1_img from './printed_tshirt.jpg'
import p1_img_hover from './hover_shirt.jpg'
import p2_img from './baggy_jeans.png'
import p2_img_hover from './baggy_jeans2.png'
import p3_img from './hover_shoes1.jpg'
import p3_img_hover from './hover_shoes2.jpg'


let data_product = [
    {
        id:1,
        name:"Colourful Summer t-shirt",
        image:p1_img,
        defaultImage: p1_img,
        hoverImage: p1_img_hover,
        new_price:300,
        old_price:450,
    },
    {
        id:2,
        name:"Light Green Jeans",
        image:p2_img,
        defaultImage: p2_img,
        hoverImage: p2_img_hover,
        new_price:700,
        old_price:850,
    },
    {
        id:3,
        name:"White Sport Shoes",
        image:p3_img,
        defaultImage: p3_img,
        hoverImage: p3_img_hover,
        new_price:500,
        old_price:650,
    },
];

export default data_product;