const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {Users} = require("./models/user");
const {Product} = require("./models/Product.js")
const {TransactionHistory} = require("./models/TransactionHistory.js")
const {TransactionHistoryController} = require("./controllers/TransactionHistoryController.js");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://henoch2912:nasigoreng123.@cluster0.sxwodqb.mongodb.net/e-commerce");


//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
})


// Route for Images folder
app.use('/images', express.static('upload/images'));


// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
    console.log("error");
  }
};


// Schema for creating user model
// const Users = mongoose.model("Users", {
//   name: { type: String },
//   email: { type: String, unique: true },
//   password: { type: String },
//   cartData: { type: Object },
//   date: { type: Date, default: Date.now() },
// });


// Schema for creating Product
// const Product = mongoose.model("Product", {
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   category: { type: String, required: true },
//   new_price: { type: Number },
//   old_price: { type: Number },
//   quantity: { type: Number },
//   review: { type: Array, default: [] },
//   date: { type: Date, default: Date.now },
//   avilable: { type: Boolean, default: true },
// });

// Schema for creating TransactionHistory
// const TransactionHistory = mongoose.model("TransactionHistory", {
//   transactionId: { type: Number, required: true },
//   userName: { type: String },
//   productList: [],
//   totalPrice: { type: Number },
//   createAt: { type: Date, default: Date.now() },
//   updatedAt: { type: Date },
//   status: {type: String },
// });

// ROOT API Route
app.get("/", (req, res) => {
  res.send("Root");
});


// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success, token });
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }
})


//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
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
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  success = true;
  res.json({ success, token })
})


// endpoint for getting all products data
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products");
  res.send(products);
});

// endpoint for getting all products data
app.get("/products/:productId", async (req, res) => {
  let product = await Product.findOne({ id: req.params.productId })
  console.log("Single Products");
  res.send(product);
});





app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(0).slice(-8);
  res.send(arr);
});



app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let arr = products.splice(0, 4);
  res.send(arr);
});


app.post("/relatedproducts", async (req, res) => {
  const { category } = req.body;
  const products = await Product.find({ category });
  const arr = products.slice(0, 4);
  res.send(arr);
});




// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added")
})


// Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
})


// Create an endpoint for getting cartdata of user
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);

})


// Create an endpoint for adding products using admin panel
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    quantity: req.body.quantity,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name })
});


// Create an endpoint for removing products using admin panel
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name })
});

// checkout
app.post("/checkout", fetchuser, async (req, res) => {
  const allProducts = await Product.find({})
  var productEdited = [];
  req.body.forEach(async (product) => {
    const productFind = allProducts.find((singleProduct) => singleProduct.id === product.id);
    const stockQuantity = productFind.quantity;
    await Product.findOneAndUpdate({ id: product.id }, { quantity: stockQuantity - product.quantity });
    productEdited.quantity = product.quantity;
    productEdited.push(productFind);
  });
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });

  let transaction = await TransactionHistory.find({});
  let transactionid;
  if (transaction.length > 0) {
    let last_transaction_array = transaction.slice(-1);
    let last_transaction = last_transaction_array[0];
    transactionid = last_transaction.transactionId + 1;
  }
  else { transactionid = 1; }
  

  let totalAmount = 0
  req.body.forEach(async (product) => {
    const stockQuantity2 = product.quantity;
    const price2 = allProducts.find((singleProduct) => singleProduct.id === product.id).new_price;
    totalAmount += stockQuantity2 * price2;
  });
  const transactionhistory = new TransactionHistory({
    transactionId: transactionid,
    userName: req.user.id,
    productList: productEdited,
    totalPrice: totalAmount,
    status: "Paid",
  });
  const productListArray = transactionhistory.productList;
  // productListArray.push()
  await transactionhistory.save();

  console.log(req.user.id);

  res.json({ success: true })
});

// review
app.post("/review", fetchuser, async (req, res) => {
  const user = await Users.findOne({ _id: req.user.id });
  const selectedProduct = await Product.findOne({ id: req.body.productId });
  const updatedProductReviews = selectedProduct.review;
  updatedProductReviews.push({ username: user.name, review: req.body.userReview });
  await Product.findOneAndUpdate({ id: req.body.productId }, { review: updatedProductReviews });
  res.json({ success: true })
});

app.get("/transcation",()=>{},getTransactionHistory)
app.post("/transaction",()=>{},createTransactionHistory)

function getTransactionHistory(req,res){}
function createTransactionHistory(req,res){}

//show transaction history
app.get("/showTransactionHistory", fetchuser, TransactionHistoryController.getTransactionHistory);


// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});

