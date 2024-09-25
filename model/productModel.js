const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    id:{
        type:String,
        require:true,
        unique:true
    },
    title:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    rating:{
        rate:{
            type:Number,
            require:true
        },
        count:{
            type:Number,
            require:true
        }
    }
})

const products = mongoose.model('products',productSchema)
module.exports = products