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

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
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
