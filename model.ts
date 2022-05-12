import {Schema,model,Document} from "mongoose";
import { type } from "os";
//1
interface lmage {
    url: string;
    name: string;
    size:number;
}

export interface Imovie {
    name: string;
    details: string;
    price: number;
    image: lmage;
}

type MovieDocument = Imovie & Document;
//2.
const imageSchema = new Schema<lmage>(
    {
        url:String,
        name:String,
        size: Number,
    },{
        _id:false,

    }
);
const movieSchema = new Schema<MovieDocument>(
    {
        name: {type: String,required : true },
        details: String,
        image: imageSchema,
    });
    //3
    export const Movie = model<MovieDocument>("movies",movieSchema);

