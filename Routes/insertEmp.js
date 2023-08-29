const { POST_insertEmpSchema } = require('../Schema/schema');
require("dotenv").config({ "path": `${__dirname}/config.env` });
const { POST_insertEmp } = require('../URL');
const { runOnDB } = require('../connection');
const {validateMobileNo,validateEmail} = require('../Validation/validation');

module.exports = function (fastify,opts,next){
    fastify.route({
        method:"POST",
        url:`/${POST_insertEmp}`,
        schema: POST_insertEmpSchema,
        handler: async function(req,res){
            try {
                const {firstName,lastName,ContactNo,EmailId} = req.body;
                if(firstName === 'string' || lastName === 'string' || ContactNo === 0 || EmailId === 'string')
                {
                    return res.send({
                        statusCode:400,
                        error:"Bad Request",
                        message:"Enter valid values to be Insert."
                    });
                }
                else if(firstName === "" || lastName === "" || ContactNo === 0 || EmailId === "")
                {
                    return res.send({
                        statusCode:400,
                        error:"Bad Request",
                        message:"Values can't be Null"
                    });
                }
                else{
                    const { user, password, host, port, database } = process.env;

                    //validate Mobile No
                    let errMsg = ``;
                    errMsg = validateMobileNo(String(ContactNo));
                    if(errMsg){
                        return res.code(422).send(errMsg);
                    }
                    errMsg =``;
                    errMsg = validateEmail(EmailId);
                    if(errMsg){
                        return res.code(422).send(errMsg);
                    }
                    // if Table is not exist it'll create
                    let query = ``;
                    await runOnDB(query,user, password, host, port, database)
                    .then(()=>{
                    })
                    .catch(err=>{
                        throw err;
                    })

                }
            } catch (error) {
                return res.code(error.statusCode).send(error);
            }
        }
    })
}