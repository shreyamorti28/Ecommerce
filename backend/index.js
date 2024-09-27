const port = 4000;  
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());

// MongoDB connection with error handling
mongoose.connect("mongodb+srv://devloper:iamdev@cluster0.oer9m.mongodb.net/Ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Ensure the upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.get("/", (req, res) => {
  res.send("Express App is running");
});

const storage = multer.diskStorage({
  destination: uploadDir, // Ensure the directory exists
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
});
  

// Serve static files from the upload directory
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Endpoint for file uploads
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const Users= mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },

})

app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,

    })
    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email})
    if(user){
        const passCampare=req.body.password===user.password;
        if(passCampare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});

        }
        else{
            res.json({success:true,error:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
app.get('/summer-collection', async (req, res) => {
    try {
      const tshirt = await Product.findOne({ category: 'T-shirt' });
      const pant = await Product.findOne({ category: 'Jeans' });
      const shoe = await Product.findOne({ category: 'Shoes' });
  
      if (!tshirt || !pant || !shoe) {
        return res.status(404).json({ success: false, message: "One or more categories are empty." });
      }
  
      const summerCollection = [tshirt, pant, shoe]; // Change to array
  
      res.json({ success: true, data: summerCollection });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching summer collection", error });
    }
  });
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch(error){
            res.status(401).send({error:"Please authenticate using valid token"})

        }
    }
}


app.post('/addtocart',fetchUser, async (req, res) => {
    console.log("Added",req.body.itemId)
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")   
});

app.post('/removefromcart',fetchUser, async (req, res) => {
    console.log("removed",req.body.itemId)
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("removed")
});

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.get('/relatedproduct/:id', async (req, res) => {
    try {
        // Get the current product by ID
        const currentProduct = await Product.findOne({ id: req.params.id });

        if (!currentProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Find related products by category, excluding the current product
        const relatedProducts = await Product.find({
            category: currentProduct.category,
            id: { $ne: currentProduct.id } // Exclude the current product
        }).limit(5); // Limit to 5 related products or change as needed

        res.json({ success: true, relatedProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching related products", error });
    }
});

  
  

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1)
        let last_product=last_product_array[0]
        id=last_product.id+1;   
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,

    })

})

app.post('/removeproduct', (req, res) => {
    const { id } = req.body;
    // Logic to remove the product from the database...
    res.json({ message: 'Product removed successfully' });
  });
  


app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection Fetched")
    res.send(newcollection);
})

app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Products fetched");
    res.send(products);
})
// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } 
    else {
        console.log("Error: " + error);
    }
});