require("dotenv").config({"path":`${__dirname}/config.env`})
const fastify = require('fastify')({});
const jwt = require('@fastify/jwt');
const path = require('path');

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/swagger'),{
    
})
const listenObject = {
    port: 3000,
    address: "127.0.0.1",
};
fastify.listen(listenObject,async (error, address) => {
    if(error)
        console.log(error);
    else    
        console.log(`Server is listening on ${address}`);
});