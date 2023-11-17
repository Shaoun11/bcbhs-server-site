const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

 

const uri =
  "mongodb+srv://bcbhs:UnFXfK3ggoiTmyBA@cluster0.3b178xe.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version




const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }, 
});

   




async function run() {
  try {
      // Connect the client to the server	(optional starting in v4.7)
      
 const bcbhsCollection = client.db("bcbhs").collection("userData");


    await client.connect();
      // Send a ping to confirm a successful connection
       app.post("/userData", async (req, res) => {
         const addData = req.body;

         const result = await bcbhsCollection.insertOne(addData);
         console.log(result);
         res.send(result);
       });



    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
      
      
   
      
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get("/", (req, res) => {
  res.send(`BCBHS`);
});

app.listen(port, () => {
  console.log(`Server: ${port}`);
});
