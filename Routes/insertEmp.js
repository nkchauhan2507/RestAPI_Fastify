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
                    let query = `CREATE TABLE IF NOT EXISTS public."Emp"
                    (
                        id serial NOT NULL,
                        firstname text,
                        lastname text,
                        mobileno numeric(10,0),
                        email text,
                        CONSTRAINT "Emp_pkey" PRIMARY KEY (id)
                    )`;
                    await runOnDB(query,user, password, host, port, database)
                    .then(()=>{
                    })
                    .catch(err=>{
                        throw err;
                    })

                    // check weather mobileno already exists..
                    query =``;
                    query = `select mobileno from "Emp" where mobileno=${ContactNo}`;
                    await runOnDB(query,user, password, host, port, database)
                    .then((result)=>{
                        if(result.rowCount > 0){
                            throw ({
                                statusCode:422,
                                error:"Unprocessable Entity",
                                message:"Entered contact number already exist.."
                            });
                        }
                    })
                    .catch(err=>{
                        throw err;
                    })

                    // check weather Email already exists..
                    query =``;
                    query = `select email from "Emp" where email='${EmailId}'`;
                    await runOnDB(query,user, password, host, port, database)
                    .then((result)=>{
                        if(result.rowCount > 0){
                            throw ({
                                statusCode:422,
                                error:"Unprocessable Entity",
                                message:"Entered Email ID already exist.."
                            });
                        }
                    })
                    .catch(err=>{
                        throw err;
                    })

                    query =``;
                    query = `insert into "Emp"(firstname,lastname,mobileno,email) values
                    ('${firstName}','${lastName}',${ContactNo},'${EmailId}')`;
                    await runOnDB(query,user, password, host, port, database)
                    .then((result)=>{
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
                return res.send(error);
            }
        }
    })

    next();
}