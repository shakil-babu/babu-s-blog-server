
//initialize express
const express = require('express')
const app = express()


// initialize mongodb
const { MongoClient } = require('mongodb');

// mongoObjectId
const ObjectId = require('mongodb').ObjectId;

// initialize cors
var cors = require('cors');
app.use(cors());

// initialize env
require('dotenv').config()
const port = process.env.PORT || 5000

// for body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gjx15.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




client.connect(err => {
  const msgCollection = client.db(`${process.env.DB_NAME}`).collection("messageCollection");
  const adminsCollection = client.db(`${process.env.DB_NAME}`).collection("admins");
  const commentssCollection = client.db(`${process.env.DB_NAME}`).collection("comments");
  const repliesCollection = client.db(`${process.env.DB_NAME}`).collection("replies");
  console.log(err);


//================================================================= Message area
// ============================================================

//   insert message into database
  app.post("/sendMessage", (req, res) => {
    const data = req.body;
    msgCollection.insertOne(data)
        .then(result => {
        res.send(result.insertedCount > 0)
        console.log(result);
  })

});

// ============== read  message from database ============
app.get('/readMessages', (req, res) => {
    msgCollection.find({})
    .toArray((error, documents) => {
        res.send(documents)
    })
  })





// ================================================= admins
// ==============================================

// ============== read specail message from database
app.get('/readAdmins', (req, res) => {
    adminsCollection.find({})
    .toArray((error, documents) => {
        res.send(documents)
    })
})











// ==================================== Comments
//   insert comment into database
app.post("/addComment", (req, res) => {
    const data = req.body;
    commentssCollection.insertOne(data)
        .then(result => {
        res.send(result.insertedCount > 0)
        console.log(result);
  })

});


// ============== read comments from database
app.get('/readComments', (req, res) => {
  commentssCollection.find({})
  .toArray((error, documents) => {
      res.send(documents)
  })
})




// ==================================== reply
//   insert reply into database
app.post("/addReply", (req, res) => {
  const data = req.body;
  repliesCollection.insertOne(data)
      .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
})

});

  
// ============== read comments from database
app.get('/readReplies', (req, res) => {
  repliesCollection.find({})
  .toArray((error, documents) => {
      res.send(documents)
  })
})









})






// listen port
app.listen(port, () => {
    console.log("5000 port is opening...")
})