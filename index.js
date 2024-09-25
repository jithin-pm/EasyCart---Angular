require('dotenv').config();
const express = require('express')
const cors =require('cors')
const routes = require('./routes/router')

require('./DB/connection')
const cartServer = express()
cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(routes)

const PORT = 3000;
cartServer.listen(PORT,()=>{
    console.log(`cart server is running in port ${PORT}`);
    
})