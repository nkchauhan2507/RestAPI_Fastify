const { deleteEmpSchema } = require('../Schema/schema');
require("dotenv").config({ "path": `${__dirname}/config.env` });
const { DELETE_deleteEmp } = require('../URL');
const { runOnDB } = require('../connection');
const {validateMobileNo,validateEmail} = require('../Validation/validation');

module.exports = function (fastify,opts,next){
    fastify.route({
        method:'DELETE',
        url:`/${DELETE_deleteEmp}/:id`,
        schema: deleteEmpSchema,
        handler: async (req,res)=>{
           // const {firstName,lastName,ContactNo,EmailId} = req.body;
            
            try {
                const { user, password, host, port, database } = process.env;

                let query = `select id from "Emp" where id=${req.params.id}`;
                
                // Check wheather given Id exists or not...
                await runOnDB(query,user, password, host, port, database)
                .then((result)=>{
                    if(result.rowCount == 0)
                    {
                        throw ({
                            statusCode:400,
                            error:"Bad Request",
                            message:"Entered Id does not exists.."
                        })
                    }
                })
                .catch(err=>{
                    throw err;
                })
                query = ``;
                query = `Delete from "Emp" where id=${req.params.id}`;
                await runOnDB(query,user, password, host, port, database)
                .then(()=>{
                    res.code(200).send({
                        statusCode:200,
                        message:"Deleted Successfully."
                    });
                })
                .catch(err=>{
                    throw err;
                })

            } catch (error) {
                res.send(error);
            }
        }
    })

    next();
}