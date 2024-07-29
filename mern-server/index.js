const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
const cors=require('cors')




app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});





//mongodb configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:7338499857@cluster0.47veljt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '21c44.prathyusha@sjec.ac.in',
    pass: 'Sjec3114+'
  }
});


async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const bookCollections=client.db("BookInventory").collection("books"); 
      const reviewCollections = client.db("BookInventory").collection("reviews");
      const orderCollections=client.db("BookInventory").collection("orders");

   // Endpoint to upload a review
   app.post("/upload-reviews", async (req, res) => {
     try {
       const data = req.body;
       const result = await reviewCollections.insertOne(data);
       res.status(201).json({ message: 'Review uploaded successfully', result });
     } catch (err) {
       console.error('Error uploading review:', err);
       res.status(500).json({ error: 'Failed to upload review' });
     }
   });
   //upload-orders
   app.post('/upload-orders',async (req, res) => {
    try {
     
  
      const data = {
        bookTitle: req.body.bookTitle,
        price: req.body.price,
        userId: req.body.userId,
        sellerId:req.body.sellerId,
        authorname:req.body.authorname,
        imageurl:req.body.imageurl,
        request:req.body.request,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      bookId:req.body.bookId
      };
  
      const result = await orderCollections.insertOne(data);
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
      console.error('Error placing order:', err);
      res.status(500).json({ error: 'Failed to place order' });
    }
  });


   // Endpoint to fetch all reviews (or by category)
   app.get("/all-reviews", async (req, res) => {
    try {
      const reviews = await reviewCollections.find({}).toArray();
      res.json(reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });
  
//getorders
app.get("/all-orders", async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query = { category: req.query.category };
    }
    const reviews = await orderCollections.find(query).toArray();
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


      //insert a book to the db: post method
      app.post('/upload-book', upload.single('imageFile'), async (req, res) => {
        try {
          if (!req.file) {
            return res.status(400).send('No file uploaded');
          }
      
          const data = {
            bookTitle: req.body.bookTitle,
            authorname: req.body.authorname,
            imageurl: `http://localhost:5000/uploads/${req.file.filename}`, // Example: Use the filename saved by multer
            category: req.body.category,
            bookDescription: req.body.bookDescription,
            price: req.body.price,
            userId: req.body.userId
          };
      
          const result = await bookCollections.insertOne(data);
          res.status(201).json({ message: 'Book uploaded successfully' });
        } catch (err) {
          console.error('Error uploading book:', err);
          res.status(500).json({ error: 'Failed to upload book' });
        }
      });
      
      
      
      //update a book data: patch or update methods
      app.patch("/book/:id",async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const updateBookData=req.body;
        const filter={_id:new ObjectId(id)};
        
  
        const updateDoc={
          $set:{
            ...updateBookData
          }
        };
        const options={upsert:true}; //update
        const result=await bookCollections.updateOne(filter,updateDoc,options);
        res.send(result);
  
  
  
      })
      app.patch("/order/:id",async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const updateOrderData=req.body;
        const filter={_id:new ObjectId(id)};
        
  
        const updateDoc={
          $set:{
            ...updateOrderData
          }
        };
        const options={upsert:true}; //update
        const result=await orderCollections.updateOne(filter,updateDoc,options);
        res.send(result);
  
  
  
      })
  
      //delete a book data
      app.delete("/book/:id",async(req,res)=>{
        const id=req.params.id;
        const filter={_id:new ObjectId(id)};
        const result=await bookCollections.deleteOne(filter);
        res.send(result);
  
      })

      //find by category
      app.get("/all-books",async(req,res)=>{
        let query={};
        if(req.query?.category){
          query={category:req.query.category}
        }
        const result=await bookCollections.find(query).toArray();
        res.send(result);
      })
  

      //to get single book data
      app.get("/book/:id",async(req,res)=>{
        const id=req.params.id;
        const filter={_id:new ObjectId(id)};
        const result=await bookCollections.findOne(filter);
        res.send(result);
      })
      //to get single book data
      app.get("/order/:id",async(req,res)=>{
        const id=req.params.id;
        const filter={_id:new ObjectId(id)};
        const result=await orderCollections.findOne(filter);
        res.send(result);
      })

    
      app.post('/send-email', async (req, res) => {
        const { sellerId, userId, bookTitle } = req.body;
      
        const mailOptions = {
          from: 'BookBridge',
          to: `${sellerId}`,
          subject: 'New Order Placed!',
          html: `<p>Hello Seller,</p><p>${userId} has placed an order for the book "${bookTitle }".</p>`,
        };
      
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Email sent:', info.response);
          res.json({ message: 'Email sent successfully' });
        } catch (error) {
          console.error('Error sending email:', error.message);
          res.status(500).json({ error: 'Failed to send email' });
        }
      });
      
      // Endpoint to create Razorpay order
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency: currency,
      receipt: receipt
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Endpoint to verify payment
app.post('/verify-payment', (req, res) => {
  const crypto = require('crypto');
  const { orderId, paymentId, signature } = req.body;

  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                  .update(orderId + '|' + paymentId)
                                  .digest('hex');

  if (generatedSignature === signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});

  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
}
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})  