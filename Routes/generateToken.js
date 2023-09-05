const {generateToken } = require('../Schema/schema');
require("dotenv").config({ "path": `${__dirname}/config.env` });
const { POST_insertEmp } = require('../URL');
const { runOnDB } = require('../connection');
const {validateEmail} = require('../Validation/validation');

module.exports = function(fastify,opts,next){
    fastify.route({
        method:'POST',
        url:`/${POST_generateToken}/`,
        schema: generateToken,
        handler: async(req,rep)=>{
            try {
                const {username,email,API_Type} = req.body;
                    const { user, password, host, port, database } = process.env;
                if(username === 'string'    || email === 'string' || API_Type === 'string' ){
                    throw ({
                        statusCode:400,
                        error:"Bad Request",
                        message:"Enter valid values to be Insert."
                    });
                }
                else if(username === "" || email === "" || API_Type === ""){
                    throw ({
                        statusCode:400,
                        error:"Bad Request",
                        message:"Values can't be Null"
                    });
                }
                else{
                    const { user, password, host, port, database } = process.env;
                    let errMsg =``;
                    errMsg = validateEmail(EmailId);
                    if(errMsg){
                        return res.code(422).send(errMsg);
                    }
                    let query = `CREATE TABLE IF NOT EXISTS public."User"
                    (uid serial NOT NULL,
                    username text NOT NULL,
                    email text NOT NULL,
                    APIType text NOT NULL,
                    token text NOT NULL,
                    CONSTRAINT "user_pkey" PRIMARY KEY(uid)
                    )`;
                    await runOnDB(query,user, password, host, port, database)
                    .then(()=>{
                        //table will be created
                    })
                    .catch(err=>{
                        throw err;
                    })

                    query = ``;
                    query = `select username from "User" where username='${username}'`;
                    await runOnDB(query,user, password, host, port, database)
                    .then((result)=>{
                        if(result.rowCount>0)
                        {
                            throw ({
                                statusCode:422,
                                error:"Unprocessable Entity",
                                message:"Entered username already exist.."
                            })
                        }
                    })
                    .catch(err=>{
                        throw err;
                    })

                    query = ``;
                    query = `select email from "User" where email='${email}'`;
                    await runOnDB(query,user, password, host, port, database)
                    .then((result)=>{
                        if(result.rowCount>0)
                        {
                            throw ({
                                statusCode:422,
                                error:"Unprocessable Entity",
                                message:"Entered Email ID already exist.."
                            })
                        }
                    })
                    .catch(err=>{
                        throw err;
                    })

                    const userToken = {
                        username : username,
                        email : email,
                        API_Type : API_Type
                    };
                    const token =fastify.jwt.sign(userToken);


                    query =``;
                    query = `insert into "User"(username,email,APIType,token) values
                    ('${username}','${email}',${API_Type},'${token}')`;
                    await runOnDB(query,user, password, host, port, database)
                    .then((result)=>{

                        next();
                        res.code(200).send({
                            statusCode:200,
                            message:"Data Inserted Successfully."
                        });
                    })
                    .catch(err=>{
                        throw err;
                    })
                }
            } catch (error) {
                res.code(error.statusCode).send(error);
            }
        }
    })

    next();
}