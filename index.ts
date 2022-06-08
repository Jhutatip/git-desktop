import express,{ Express,Request,Response } from "express";
import connectMongo from "./connect/mongo";
connectMongo();
import fileUpload,{UploadedFile} from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors"
import { requestTime } from "./middlewares/date.middlewares";
import router from "./routes/movie.router";

const app:Express = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static("uploads"));
app.use(fileUpload());

const port = process.env.port

app.use((req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })
  app.use(router)

  app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`); 
});