const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url),(err,db)=> {
    if (err) throw err;
    //let dbo=db.db("mydb");
    console.log("Databse created!");
    db.close();

}