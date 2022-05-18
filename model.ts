import mongoose,{ Mongoose } from "mongoose";
const movieSchema = new mongoose.Schema({
    name: String,
    url: String,
    size: Number,
})
const Movieroger = mongoose.model("obj",movieSchema);
export default Movieroger;