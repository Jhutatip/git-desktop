import express, {Express, Request, Response} from "express";
const port = 6000;
import connectMongo from "./mongo";
connectMongo();

import Movieroger from "./model"
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

  app.listen(port)
  console.log("App is running on port ${port}");
  

