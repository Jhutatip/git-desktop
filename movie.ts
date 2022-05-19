import express, {Express, Request, Response} from "express";
const port = 2000;
import connectMongo from "./mongo";
connectMongo();

import Movieroger from "./model"
import { Mongoose } from "mongoose";
const app: Express = express();



//movie create
app.post("/movie-create",(req,res) => {
    const payload = req.body;
    const movie = new Movieroger(payload);
    movie
      .save()
      .then(res.status(201).end())
      .catch((error: { message: any; }) => {
        res.status(500).send({ message: error.message });
  })
  });

  

  //get movie list
  app.get("/moive-list",async(req:Request,res:Response)=>{
    Movieroger.find()
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  
  
//get movie by id
app.get("/movie-id",async(req:Request,res:Response)=>{
  const id = req.params;
  Movieroger.findOne({ id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})

//update movie
app.put("/update-movie",async(req:Request,res:Response)=>{
  const update = req.params.id;
  Movieroger.find()
  .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})
//delete movie
//app.delete("/delete-movie",async(req:Request,res:Response)=>{
//const movieObjects = await Movieroger.deleteOne( {movieName:Movieroger});
//console.log('Document Deleted', Movieroger)
//})

  app.listen(port)
  console.log("App is running on port ${port}");
