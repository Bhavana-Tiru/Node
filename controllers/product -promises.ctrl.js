const { response, request } = require("express");


const productsModel = require('../models/products.model');
const products=[];

const productCrtl={
    getAll:(request,response)=>{
        productsModel.find().then((products)=>{
            response.status(200);
             response.send({       // obj-{}- we can add extra parameters
                data:products
            });
        }).catch(error=>{
            response.status(500);
            response.send({error:'server_error', description:error});
        });
    },
    getByID:( request,response)=>{
        productsModel.findById(request.params.productId).then((products)=>{
            response.status(200);
             response.send({       // obj-{}- we can add extra parameters
                data:products
            });
        }).catch(error=>{
            response.status(500);
            response.send({error:'server_error', description:error});
        });
        // const filteredProduct=products.find(product=>product.id=== +request.params.productId);
        // if(filteredProduct){
        //     response.status(200);
        //     response.send({
        //         data:filteredProduct
        //     });
        // }
        // else{
        //     response.status(404);
        //     response.send({
        //         error:'Product not Found',
        //         errorDescription:'Product doesnot exist, in the database'
        //     }
        //     );
        // }
    },
    add:(request,response)=>{
       productsModel.findOne( {name: request.body.name}).then(product=>{    // we can acess any parameter in products using findOne
            if(product){
                response.status(409);
                response.send({
                    error:'Product already exist',
                    errorDescription:'Product already exist with the name provided in the request'
                });
            }else{
                const productToAdd=new productsModel(request.body);
                productToAdd.save().then(addedProduct=>{
                    response.status(201);
                    response.send({
                        data:addedProduct
                    })
                }).catch(error=>{
                    console.log(error);
                    response.status(500);
                    response.send({error:'server_error', description:error});
                });
            }
        }).catch(error=>{
            console.log(error);
            response.status(500);
            response.send({error:'server_error', description:error});
        });
    },
    update:(request,response)=>{
        productsModel.findByIdAndUpdate(request.params.productId, request.body).then(updatedProduct=>{
                response.status(200);
                response.send({
                    data:updatedProduct
                })
        }).catch(error=>{
            console.log(error);
            response.status(500);
            response.send({error:'server_error', description:error});
        });

        // const index=products.findIndex(product=>product.id===+request.params.productId);
        // if(index !== -1){
        //     ['imgSrc','specifications','price'].forEach(parameterName=>{
        //             products[index][parameterName]= request.body[parameterName];
        //     });
        //     response.status(200);
        //     response.send({
        //         status:'upadated successfully',
        //         data:products[index]
        //     })
        // }else{
        //     response.status(400);
        //     response.send({
        //         error:'product doesnot exists',
        //         errorDescription:'product doesnot exist with the name provided',
        //     });
        // }
    },
    patch:(request,response)=>{
        productsModel.findByIdAndUpdate(request.params.productId, {$set:{...request.body}},{new:true}).then(updatedProduct=>{
            response.status(200);
            response.send({
                data:updatedProduct
            });
        }).catch(error=>{
            console.log(error);
            response.status(500);
            response.send({error:'server_error', description:error});
        });
    },
    delete:(request,response)=>{
        productsModel.findByIdAndDelete(request.params.productId).then(product=>{
            response.status(200);
            response.send({
                status:'Record deleted successfully',
                data:product
            });
        }).catch(error=>{
            console.log(error);
            response.status(500);
            response.send({error:'server_error', description:error});
        });
        // const index=products.findIndex(product=>product.id===+request.params.productId);
        // if(index !== -1){
        //     products.splice(index,1);
        //     response.status(200);
        //     response.send({
        //         status:"Deleted Successfully"
        //     });
        // }
        // else{
        //     response.status(400);
        //     response.send({
        //         error:'product doesnot exists',
        //         errorDescription:'product doesnot exist with the name provided',
        //     });
        // }    
    }

};

module.exports=productCrtl;