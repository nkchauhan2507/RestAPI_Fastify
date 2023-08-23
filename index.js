require("dotenv").config({"path":`${__dirname}/config.env`})
const fastify = require('fastify')({});
const jwt = require('@fastify/jwt');
const { readFileSync } = require("fs");
const path = require('path');

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/swagger'),{
    exposeRoute: true,
    swagger:{
        schemes: ['http'],
        info:{
            title:'Employee API',
            version: '1.0.0.0'
        },
        "tags":[
            {
                "name":"Employee data related operation"
            }
        ],
        securityDefinitions:{
            apiKey:{
                type:'apiKey',
                name:'Authorization',
                in:'header'
            }
        },
        hideUntagged: true
    }
})

// to load swagger UI
fastify.register(require('@fastify/static'),{
    root: path.join(__dirname,'documentation_UI')
});

//routes
// fastify.register(require('fastify-autoload'),{
//     dir:path.join(__dirname,'Routes')
// })

// jwt 
// fastify.register(require('@fastify/jwt'),{
//     secret:{
//         private:readFileSync('./config/private.key','utf-8'),
//         public :readFileSync('./config/public.key','utf-8')
//     },
//     sign:{algorithm:'RS256',expiresIn:`10d`,issuer:'nk.tld'},
//     verify : {issuer:'nk.tld'}
// })

// fastify.addHook("onRequest",async(req,reply)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })



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