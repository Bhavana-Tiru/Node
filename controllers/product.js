const { response, request } = require("express");

const products=[
    {
        id:1,
        name:'SAMSUNG Galaxy Z Fold5 (Phantom Black, 256 GB)',
        imgSrc:'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/x/i/galaxy-fold5-sm-f946bzkdins-samsung-original-imagru9nrhhmd9hz.jpeg?q=70',
        price:'₹1,54,999',
        specifications:[
            '12 GB RAM | 256 GB ROM',
            '15.75 cm (6.2 inch) Display',
            '50MP + 12MP + 10MP',
            '4400 mAh Battery',
            'Snapdragon 8 Gen 2 Processor'

        ]
    },
    {
        id:2,
        name:'SAMSUNG Galaxy Z Fold5 (Icy Blue, 512 GB)',
        imgSrc:'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/2/r/galaxy-fold5-sm-f946blbhins-samsung-original-imagru5ugghfnwnj.jpeg?q=70',
        price:'₹1,64,999',
        specifications:[
            '12 GB RAM | 512 GB ROM',
            '15.75 cm (6.2 inch) Display',
            '50MP + 12MP + 10MP',
            '4400 mAh Battery',
            'Snapdragon 8 Gen 2 Processor'

        ]
    },
    {
        id:3,
        name:'SAMSUNG Galaxy Z Fold5 (Icy Blue, 256 GB)',
        imgSrc:'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/2/r/galaxy-fold5-sm-f946blbhins-samsung-original-imagru5ugghfnwnj.jpeg?q=70',
        price:'₹1,54,999',
        specifications:[
            '12 GB RAM | 256 GB ROM',
            '15.75 cm (6.2 inch) Display',
            '50MP + 12MP + 10MP',
            '4400 mAh Battery',
            'Snapdragon 8 Gen 2 Processor'

        ]
    },
    {
        id:4,
        name:'SAMSUNG Galaxy Z Fold5 (Cream, 256 GB)',
        imgSrc:'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/g/k/a/galaxy-fold5-sm-f946bzegins-samsung-original-imagru5udkewyvyn.jpeg?q=70',
        price:'₹1,54,999',
        specifications:[
            '12 GB RAM | 256 GB ROM',
            '15.75 cm (6.2 inch) Display',
            '50MP + 12MP + 10MP',
            '4400 mAh Battery',
            'Snapdragon 8 Gen 2 Processor'

        ]
    },
];
const productCrtl={
    getAll:(request,response)=>{
        response.status(200);
        response.send({       // obj-{}- we can add extra parameters
            data:products
        });
    },
    getByID:( request,response)=>{
        const filteredProduct=products.find(product=>product.id=== +request.params.productId);
        if(filteredProduct){
            response.status(200);
            response.send({
                data:filteredProduct
            });
        }
        else{
            response.status(404);
            response.send({
                error:'Product not Found',
                errorDescription:'Product doesnot exist, in the database'
            }
            );
        }
    },
    add:(request,response)=>{
        const filteredProduct=products.find(product=>product.name=== request.body.name);
        if(filteredProduct){
            response.status(409);
            response.send({
                error:'product already exists',
                errorDescription:'product already exists with the  name provided in the request',
            })
        }else{
            const createdProduct={
                id: products.length+1,
                ...request.body
            }
            products.push(createdProduct);
            response.status(201);
            response.send({
                data:createdProduct
            });
        }
    },
    update:(request,response)=>{
        const index=products.findIndex(product=>product.id===+request.params.productId);
        if(index !== -1){
            ['imgSrc','specifications','price'].forEach(parameterName=>{
                    products[index][parameterName]= request.body[parameterName];
            });
            response.status(200);
            response.send({
                status:'upadated successfully',
                data:products[index]
            })
        }else{
            response.status(400);
            response.send({
                error:'product doesnot exists',
                errorDescription:'product doesnot exist with the name provided',
            });
        }
    },
    delete:(request,response)=>{
        const index=products.findIndex(product=>product.id===+request.params.productId);
        if(index !== -1){
            products.splice(index,1);
            response.status(200);
            response.send({
                status:"Deleted Successfully"
            });
        }
        else{
            response.status(400);
            response.send({
                error:'product doesnot exists',
                errorDescription:'product doesnot exist with the name provided',
            });
        }    
    }

};

module.exports=productCrtl;