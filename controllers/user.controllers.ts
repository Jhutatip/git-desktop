import express,{Express,Request,Response} from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.models"
 require("dotenv").config();

const app = express();

const bodyParser = require('body-parser')

export const regis = async(req:Request,res:Response)=>{
    try {
        
        const { first_name, last_name, email, password } = req.body;
    
        
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
      
       
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        
        
       const encryptedPassword = await bcrypt.hash(password, 10);
    
        
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), 
          password: encryptedPassword,
        });
    
        
        const token = jwt.sign(
          { user_id: user._id, email },
            "process.env.TOKEN_KEY",
          {
            expiresIn: "2h",
          }
        );
        
        user.token = token;
    
        
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

export const login = async(req:Request, res:Response)=>{
   
    try{
        
        const {email,password}=req.body;

        
        if(!(email&&password)){
            res.status(400).send("All input is required");
        }
        
        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password,user.password))){
            
            const token = jwt.sign(
                {user_id: user._id,email},
                  'Hello',
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;

           
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }catch (err){
        console.log(err);
    }
}
export const welcome = (req:Request,res:Response)=>{
    res.status(200).send("welcome 🐬");
  }

  
export default exports;


