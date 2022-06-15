import express,{ Express,Request,Response } from "express";


import connectMongo from "./connect/mongo";
connectMongo();


import fileUpload,{UploadedFile} from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from 'dotenv';

import router from "./routes/user.routes";
import userRoute from "./routes/movie.router";


import { requestTime } from "./middlewares/date.middlewares";
import  requestMethod  from "./middlewares/mets.middewares";

dotenv.config();
const app:Express = express();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("uploads"));
app.use(fileUpload());


app.use(requestMethod)
app.use(requestTime)

//use route
app.use(userRoute)
app.use(router)

app.listen(process.env.port || "9001")
console.log(`App is start on port ${process.env.port}`);