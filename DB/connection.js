const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log("mongoDB connected successfully");
}).catch((err)=>{
    console.log("mongoDB connection failed");
})
