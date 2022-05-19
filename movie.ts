import connectMongo from "./mongo";
connectMongo();

import Movie from "./model";
import {response} from "express";
import {request} from "http";
import {error} from "console";
import {Request} from "express";

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

app.use(express.static('public'))
app.use(fileUpload({
  createParentPath: true
}));



const port = 3000;

//movie create
app.post("/movie-create",(req:any,res:any) => {
  const payload = req.body;
  const movie = new Movie(payload);
  movie
    .save()
    .then(res.status(201).end())
    .catch((error: { message: any; }) => {
      res.status(500).send({ message: error.message });
})
});

// get movie list
app.get("/list",async(req:any,res:any)=>{
  Movie.find()
  .then((movies) => res.json(movies))
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
})
  
  
//get movie by id
app.get("/movie-id",(req:any,res:any)=>{
  const id = req.params;
  Movie.findById({ _id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})

//update movie
app.put("/update-movie/:movieId",(req:any,res:any)=>{
  //const payload = req.params;
  Movie.findByIdAndUpdate({_id: req.params.movieId})
    .then(res.status(200).end)
    .catch((err)=>{
      res.status(500).send({ message: err.message });
  });
})

//delete movie
app.delete("/delete-movie/:id",(req:any,res:any)=>{
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
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
  console.log(`App is running on port ${port}`);
