require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT || 4000; // Default to 4000 if PORT is not set
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
mongoose.connect(process.env.MONGO_URI)
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

const Users = mongoose.model('Users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: { id: user.id }
  };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

app.get('/relatedproducts', async (req, res) => {
  try {
    const relatedProducts = await Product.find({}); // Fetch all products
    if (relatedProducts.length === 0) {
      return res.status(404).json({ success: false, message: "No related products found" });
    }

    res.json({ success: true, data: relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching related products", error });
  }
});

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: { id: user.id }
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

app.get('/summer-collection', async (req, res) => {
  try {
    // Fetch one T-shirt
    const tshirt = await Product.findOne({ category: 'T-shirt' }).sort({ date: -1 });
    
    // Fetch one pair of Jeans
    const pant = await Product.findOne({ category: 'Jeans' }).sort({ date: -1 });
    
    // Fetch one pair of Shoes
    const shoe = await Product.findOne({ category: 'Shoes' }).sort({ date: -1 });

    if (!tshirt || !pant || !shoe) {
      return res.status(404).json({ success: false, message: "One or more categories are empty." });
    }

    const summerCollection = [tshirt, pant, shoe]; // Return the collection as an array

    res.json({ success: true, data: summerCollection });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching summer collection", error });
  }
});

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  }
};

app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post('/getcart', fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post('/removeproduct', (req, res) => {
  const { id } = req.body;
  // Logic to remove the product from the database
  res.json({ success: true, message: `Product with ID ${id} removed.` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
