 import express from "express";
 const router = express.Router();
 import {viwMovie,findId, getMovie, deleteMovie, updateMovie, getPic} from "../controllers/movie.controllers"

 router.post("movie-create",getMovie)
 router.post("movie",getPic)
 router.get("/list",viwMovie)
 router.get("/byID/:id",findId)
 router.put("update=movie",updateMovie)
 router.delete("/delete-movie",deleteMovie)

 export default router;
