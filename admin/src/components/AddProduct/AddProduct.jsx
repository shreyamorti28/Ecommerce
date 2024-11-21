import React, { useState } from 'react'
import './AddProduct.css'
import uploadarea from '../../assets/upload.png'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "T-shirt", // Match with available options in select
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        // Basic validation
        if (!productDetails.name || !image || !productDetails.new_price || !productDetails.old_price) {
            alert("Please fill in all the fields and upload an image.");
            return;
        }

        try {
            // Upload the image
            let formData = new FormData();
            formData.append('product', image);

            let response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            let responseData = await response.json();

            if (responseData.success) {
                // Add the uploaded image URL to the product details
                let product = { ...productDetails, image: responseData.image_url };

                // Submit the full product data
                let productResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                let productData = await productResponse.json();
                productData.success ? alert("Product Added") : alert("Failed to add product");
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    }

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Old Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Shoes">Shoes</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : uploadarea} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct;
