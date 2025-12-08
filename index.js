import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

let app = express() 

app.use(bodyParser.json()) 
app.use((req,res,next)=>{
    let token = req.header
    ("Authorization")
    
    //remove "bearer "
    if(token != null){
        token = token.replace("Bearer ","")

        jwt.verify(token,"your_jwt_secret_key",
        (err,decoded)=>{
            if(!err){
                console.log("Decoded JWT:", decoded)
                req.user = decoded
            }
        })
    }next()
})


let mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)

let connection = mongoose.connection

connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully")
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})