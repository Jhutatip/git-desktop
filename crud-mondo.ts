// import express, {Express, Request, Response} from "express";
// import bodyParser from "body-parser";
// import { Movie, Imovie } from "./model";
// import connectMongo from "./mongo";
// connectMongo();

// import { Movie , Imovie } from "./model";

// const app: Express = express();
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());

// app.get("/movies",async (req:Request,res:Response)=>{
//     const movies = await Movie.find();
//     res.send(movies);
// });

// interface MovieRequest extends Request{
//     body: Imovie;
// }
// app.post("/movies",async(req: MovieRequest,res: Response)=>{
//     const movie = await Movie.create(req.body);;

//     res.send(movie);
// });

// const port = 9000;
// app.listen(port, function(){
//     console.log(`Sever is listening on port ${port}`); 
// });