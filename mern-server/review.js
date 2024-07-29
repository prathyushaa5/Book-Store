// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB configuration
// const uri = "mongodb+srv://mern-book-store:7338499857@cluster0.47veljt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect to MongoDB
//     await client.connect();

   

//     // Ping MongoDB to confirm connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Close MongoDB client when finished
//     // await client.close();
//   }
// }

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// // Run the main function to start the application
// run().catch(console.dir);
