const port = 4000;  
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(cors());




// MongoDB connection with error handling
mongoose.connect("mongodb+srv://devloper:iamdev@cluster0.oer9m.mongodb.net/Ecommerce",{
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
    serverSelectionTimeoutMS: 5000,
  })
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

const validatePassword = (password) => {
    // Password should contain at least one lowercase, one uppercase, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Signup endpoint
  app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, errors: "All fields are required" });
    }
  
    if (!validatePassword(password)) {
      return res.status(400).json({ success: false, errors: "Password must be at least 8 characters long, contain a number, an uppercase letter, a lowercase letter, and a special character." });
    }
  
    let check = await Users.findOne({ email });
    if (check) {
      return res.status(400).json({ success: false, errors: "User already exists" });
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = new Users({ 
      name: username, 
      email, 
      password: hashedPassword 
    });
    await user.save();
    
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  });
  
  // Login endpoint
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, errors: "Email and Password are required" });
    }
  
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, errors: "Invalid email" });
    }
  
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, errors: "Invalid password" });
    }
  
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
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


app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ success: false, errors: "Item ID is required" });
        }

        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Initialize cartData if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // Ensure item is in cartData
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 0;
        }

        // Increment quantity of the item
        userData.cartData[itemId] += 1;

        // Save updated cartData
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server error" });
    }
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ success: false, errors: "Item ID is required" });
        }
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Ensure cartData exists
        if (!userData.cartData || !userData.cartData[itemId]) {
            return res.status(400).json({ success: false, errors: "Item not found in cart" });
        }

        // Decrement quantity of the item, ensuring it's not below 0
        if (userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;
        }

        // Save updated cartData
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server error" });
    }
});

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json(userData.cartData);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cart data", error });
    }
});

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
const Newsletter = mongoose.model("Newsletter", {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  
  app.post("/subscribe", async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
  
    try {
      const existingSubscriber = await Newsletter.findOne({ email });
      if (existingSubscriber) {
        return res.status(400).json({ success: false, message: "Email is already subscribed." });
      }
  
      const subscription = new Newsletter({ email });
      await subscription.save();
      res.status(201).json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Subscription failed.", error });
    }
  });
  