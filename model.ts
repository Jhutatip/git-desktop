import mongoose,{Mongoose}  from "mongoose";
import { Schema,model,Document } from "mongoose";
import{ type } from "os";

interface Imge {
    name : String;
    url : String;
    size : Number;
}
export interface Imovie {
    name : string;
    details : string;
    price : number;
    image : Imge ;
}
type MovieDocument = Imovie &Document;
const imageSchema = new Schema<Imge> (
    {
        url:String,
        name:String,
        size : Number,
    },{

        _id:false,
    }
);
const movieSchema = new Schema<MovieDocument>({
    name : {type: String,required : true},
    price: String,
    details: String,
    image: imageSchema,
});

export const Movie = model<MovieDocument>("movies",movieSchema);
export default Movie;
 