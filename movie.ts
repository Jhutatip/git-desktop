import connectMongo from "./mongo";
connectMongo();

import Movie from "./model";

import express from  "express";
import fileUpload from  "express-fileupload";
import bodyParser  from "body-parser";

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(
  fileUpload({
  createParentPath: true
  })
);

const port = 3000;

//movie create
app.post("/movie-create",async(req:any,res:any) => {
  const payload = req.body;
  const movie = new Movie(payload);
  console.log(movie);

  try{
    const result = await movie.save();
    res.send(result);
  }catch(error:any){
    res.status(500).send({ message: error.message });
  }

  movie
    .save()
    .then(res.status(201).end())
    .catch((error: { message: any; }) => {
      res.status(500).send({ message: error.message });

});

app.post("/movies", async (req:MovieRequest, res:Response ) => {
  const image = req?.files?.image as UploadedFile;
  const UploadedFile =__dirname + "/uplonds/"+image.name;
image.mv(uploadPath,(err) => {
  if (err) console.iog (err);
});
const data ={
  ...req.body,
  image {
    url :`http://localhost:${post}/${image.name}`,
    size : image.size,
    name: image.name,
  },
};

res.send(data);

});

// get movie list
app.get("/list",(req:any,res:any)=>{
  Movie.find()
  .then((Movie)=>res.json(Movie))
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
})
  
  
//get movie by id
app.get("/byid/:id",async(req:any,res:any)=>{
  const id = await  req.params.id;
  Movie.findById({ _id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})

//update movie

app.put("/update-movie/:id",(req,res)=>{
  //const payload = req.params.id;
  const movie = Movie.findByIdAndUpdate(req.params.id, req.body)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update movie`
      });
    } else {
      res.send({
        message: "Tutorial was update successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not update movie with id=${req.params.id}`
    })
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

  app.listen(port)
  console.log(`App is running on port ${port}`);
