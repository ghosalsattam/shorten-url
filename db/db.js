
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yavid67393:sattamghosal@cluster0.tuvmeou.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("sample-url-database").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);








//require mongoose module
const mongoose = require("mongoose");
const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

//export this function and imported by server.js
module.exports.dbConnect = async function (reconnect = 1) {
  try {
    const options = {
      minPoolSize: 10
    };
    await mongoose.connect(uri, options);
    //mongoose.set('useFindAndModify', false);

    mongoose.connection.on("connected", function () {
      console.log("Mongoose default connection is open");
    });

    mongoose.connection.on("error", function (err) {
      console.log(
        "Mongoose default connection has occured " +
          JSON.stringify(err) +
          " error"
      );
    });

    mongoose.connection.on("disconnected", function () {
      console.log("Mongoose default connection is disconnected");
    });

    mongoose.Model.on("index", function (err) {
      if (err) {
        console.log(JSON.stringify(err));
      }
    });

    process.on("SIGINT", function () {
      mongoose.connection.close(function () {
        console.log(
          "Mongoose default connection is disconnected due to application termination"
        );
        process.exit(0);
      });
    });
  } catch (err) {
    console.log(
      "Error occured in connecting to the database. error = " +
        JSON.stringify(err)
    );
    if (reconnect < 5) {
      console.log("Now reconnecting again after 5 seconds");
      await wait(5000);
      this.dbConnect(reconnect + 1);
    } else {
      console.log(
        "Connection to the database is not possible so now exiting with exit code as 1"
      );
      process.exit(1);
    }
  }
};
