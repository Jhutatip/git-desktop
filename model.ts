import mongoose,{ Mongoose } from "mongoose";
const movieSchema = new mongoose.Schema({
    name: String,
    url: String,
    size: Number,
})
const Movie = mongoose.model("movie",movieSchema);
export default Movie;

