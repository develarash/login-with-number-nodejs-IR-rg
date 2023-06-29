import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥💥🚀 Shutting down ...");
    console.log(err.name, err.message);
    process.exit(1);
  });

import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credential.js";
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controllers/errorController.js";
import authRoute from "./routes/api/authRoute.js"
import userRoute from "./routes/api/userRoute.js"

dotenv.config();

const app = express();



app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json({message:"root"})
})
app.use("/api/auth",authRoute )

app.use("/api/user",userRoute)
app.use("*",(req,res,next)=>{

    next(new AppError(`can't find ${req.originalUrl} on this server `, 404));
})

app.use(globalErrorHandler)
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to MongoDb successfully")
        
    })
    const PORT =process.env.PORT || 4500

const server = app.listen(PORT, () =>
  console.log(`server is running in port ${PORT}`)
);


process.on("unhandledRejection",(err)=>{
    console.log('UNHANDLED REGECTION !  shutting down ...')
    console.log(err.name,err.message)
    server.close(()=>{
        process.exit(1);
    })
})