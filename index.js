require("dotenv").config({"path":`${__dirname}/config.env`})
const fastify = require('fastify')({});
const jwt = require('@fastify/jwt');
const path = require('path');

fastify.register(require('@fastify/cors'));

// to load swagger UI
fastify.register(require('@fastify/static'),{
    root: path.join(__dirname,'documentation')
});

fastify.register(require('fastify-swagger'),{
    exposeRoute: true,
    routePrefix:'/doc',
    swagger:{
        schemes: ['http'],
        info:{
            title:'Employee API',
            version: '1.0.0.0',
        },
        "tags":[
            {name:"CRUD Operaitons",description:"Employee related APIs"},
            {name:"Token Realated Operations",description:"Authentication related APIs"}
        ],
        // securityDefinitions:{
        //     apiKey:{
        //         type:'apiKey',
        //         name:'Authorization',
        //         in:'header'
        //     5
        // },
        hideUntagged: true
    }
})

// to load swagger at root(/) URL
fastify.get('/',{
    schema:{
        hide:true, // it'll hide this API on Sever..
    },
    handler:(request,reply)=>{
        reply.redirect('/doc');
    }
})

// Load all routes
fastify.register(require('@fastify/autoload'),{
    dir:path.join(__dirname,'Routes'),
})

// jwt 
// fastify.register(require('@fastify/jwt'),{
//     secret:{
//         private:readFileSync('./config/private.key','utf-8'),
//         public :readFileSync('./config/public.key','utf-8')
//     },
//     sign:{algorithm:'RS256',expiresIn:`10d`,issuer:'nk.tld'},
//     verify : {issuer:'nk.tld'}
// })

fastify.addHook("onRequest",async(req,reply)=>{
    try {
        if(req.raw.url.indexOf(`/getToken`) > -1
        ||  req.rw.url.indexOf(`/generateToken`) > -1){
            return;
        }
        var urlLength = req.raw.url.length;
        if(urlLength > 6501){
            reply.code(400).send({
                statusCode:400,
                error:"Bad Request",
                message:`Get URL can't be length of more than 6500 character. `
            });
            return;
        }
        if(req.raw.url.indexOf(`/getEmp`) > -1
        || req.raw.url.indexOf(`/insertEmp`) > -1
        || req.raw.url.indexOf(`/updateEmp`) > -1
        || req.raw.url.indexOf(`/updateAllEmp`) > -1
        || req.raw.url.indexOf(`/deleteEmp`) > -1
        ){
            await req.jwtVerify()
            .then((decoded)=>{
                console.log(decoded);
            })
            .catch(err=>{
                let error = {
                    statusCode:500,
                    message:"Invalid Token.Enter valid API's Token"
                };
                reply.code(error.statusCode).send(error);
            })
        }
    } catch (error) {
        reply.code(error.statusCode).send(error);
    }
})


const listenObject = {
    port: 5000,
    address: "127.0.0.1",
};
fastify.listen(listenObject,async (error, address) => {
    if(error)
        console.log(error);
    else    
        console.log(`Server is listening on http://localhost:5000/`);
})