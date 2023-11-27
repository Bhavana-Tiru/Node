const mongoose= require('mongoose');

const productsSchema=new mongoose.Schema({
    name:{
        type:"String"
    },
    
    price:{
        type:"String"
    },
    specifications:[{
        type:'String'
    }],
    imgSrc:{
        type:'String'
    },
    inStock:{
        type:'boolean'
    }
}, { timestamps: true });

const productsModel=mongoose.model('products',productsSchema);

module.exports=productsModel;