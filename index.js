const express=require('express');
const app=express();
const bodyParse=require('body-parser');
const mongoose=require('mongoose');

// const productCrtl=require('./controllers/product.js');
const productCrtl=require('./controllers/product -promises.ctrl');

app.get('/',function(request,response){
    response.status(200);
    response.send({
        status:'welcome tto Ecommerse App Services'
    });
});

// app.get('/books',function(request,response){
//         const books=[
//             {
//                 title: "Oliver Twist",
//                 pages: 234,
//                 releaseDate: "1839",
//             },
//             {
                
//                 title: "Hard Times",
//                 pages: 300,
//                 releaseDate: "1854",
//             },
//             {
            
//                 title: "Hamlet",
//                 pages: 160,
//                 sreleaseDate: "1603",
//             }

//         ];
//         response.send(books);
// })
app.use(bodyParse.json());

app.get('/api/products',productCrtl.getAll);
app.get('/api/products/:productId',productCrtl.getByID);
app.post('/api/products',productCrtl.add);
app.put('/api/products/:productId',productCrtl.update);
app.delete('/api/products/:productId',productCrtl.delete);
app.patch('/api/products/:productId',productCrtl.patch);

app.listen(3006,function(){
    console.log("Server is started in 3006 port number");
});

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-7').then((response)=>{
    console.log('connected to the database successfully');
}).catch(error=>{
    console.log('Unable to connect to the database');
});

