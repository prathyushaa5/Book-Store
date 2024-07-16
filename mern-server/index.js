const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

//middleware
const cors=require('cors')
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//mongodb+srv://mern-book-store:<password>@book-store.ydtp9vw.mongodb.net/?retryWrites=true&w=majority&appName=Book-Store
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

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
  
      // create a collection of documents
      const bookCollections=client.db("BookInventory").collection("books");
  
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
      
      
      //get all books from db
    //   app.get("/all-books",async(req,res)=>{
    //     const books= bookCollections.find();
    //     const result=await books.toArray();
    //     res.send(result);
  
    //   })
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
  console.log(`Example app listening on port ${port}`)
})