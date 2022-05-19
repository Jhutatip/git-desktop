import express, {Express, Request, Response} from "express";
const port = 2000;
import connectMongo from "./mongo";
connectMongo();

import Movieroger from "./model"
import { Mongoose } from "mongoose";
const app: Express = express();



//movie create
app.post("/movie-create",(req:Request,res:Response) => {
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
  app.get("/list",(req:Request,res:Response)=>{
    Movieroger.find()
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  
  
//get movie by id
app.get("/movie-id",(req:Request,res:Response)=>{
  const id = req.params;
  Movieroger.findById({ _id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})

//update movie
app.put("/update-movie/:movieId",(req,res)=>{
  //const payload = req.params;
  Movieroger.findByIdAndUpdate({_id: req.params.movieId})
    .then(res.status(200).end)
    .catch((err)=>{
      res.status(500).send({ message: err.message });
  });
})

//delete movie
app.delete("/delete-movie/:id",(req,res)=>{
  const id = req.params.id;
  Movieroger.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id="+ id
      });
    });
  })





//app.put("/update-movie",async(req:Request,res:Response)=>{
 // const update = req.params.id;
 // Movieroger.find()
//.then((movies) => res.json(movies))
//.catch((err) => {
//    });
//})


  app.listen(port)
  console.log("App is running on port ${port}");
