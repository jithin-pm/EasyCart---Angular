const mongoose = require('mongoose')
const wislistSchema = new mongoose.Schema({

    userId:{
        type:String,
        require:true,        
    },
    id:{
        type:Number,
        require:true,

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
const wishlists = mongoose.model('wishlists',wislistSchema)
module.exports = wishlists