require("dotenv").config({ "path": `${__dirname}/config.env` });
const { PATCH_updateEmpSchema, PUT_updateEmpSchema } = require('../Schema/schema');
const { PATCH_updateEmp, PUT_updateEmp } = require('../URL');
const {validateInputValue} = require('../Validation/validation')
const { runOnDB } = require('../connection');

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'PATCH',
        url: `/${PATCH_updateEmp}/:id`,
        schema: PATCH_updateEmpSchema,
        handler: async (req, res) => {
            try {
                const { fname, lname } = req.body;
                const { user, password, host, port, database } = process.env;
                const { id } = req.params;

                let query = ``;
                query = `select id from "Emp" where id=${id}`;
                await runOnDB(query, user, password, host, port, database)
                .then((result) => {
                    if(result.rowCount == 0){
                        throw ({
                            statusCode:422,
                            error:"Bad Request",
                            message:"Entered Id already does not exists"
                        });
                    }
                })
                .catch(err => {
                    throw err;
                })
                let err = ``;
                err = validateInputValue(fname,lname);
                if(err)
                {
                    throw err;
                }
                query =``;
                query = `update "Emp" set firstname = '${fname}',lastname='${lname}' where id=${id}`;
                await runOnDB(query,user, password, host, port, database)
                .then(()=>{
                    res.code(200).send({
                        statusCode:200,
                        message:"Data Updated Successfully."
                    });
                })
                .catch(err=>{
                    throw err;
                })      

            } catch (error) {
                return res.code(statusCode).send(error);
            }
        }
    });

    fastify.route({
        method: 'PUT',
        url: `/${PUT_updateEmp}/:id`,
        schema: PUT_updateEmpSchema,
        handler: async (req, res) => {
            try {
                const { fname, lname,ContactNo,EmailId } = req.body;
                const { user, password, host, port, database } = process.env;
                const { id } = req.params;

                let query = ``;
                query = `select id from "Emp" where id=${Id}`;
                await runOnDB(query, user, password, host, port, database)
                .then((result) => {
                    if(result.rowCount == 0){
                        throw ({
                            statusCode:422,
                            error:"Bad Request",
                            message:"Entered Id already does not exists"
                        });
                    }
                })
                .catch(err => {
                    throw err;
                })
                let errMsg = ``;
                errMsg = validateInputValue(fname,lname,ContactNo,EmailId);
                if(errMsg)
                {
                    throw errMsg;
                }
                
                //validate Mobile No
                errMsg = ``;
                errMsg = validateMobileNo(String(ContactNo));
                if(errMsg){
                    throw errMsg;
                }
                // validate Email Id
                errMsg =``;
                errMsg = validateEmail(EmailId);
                if(errMsg){
                    throw errMsg;
                }

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
                query = `update "Emp" set firstname = '${fname}',lastname='${lname}',contactno=${ContactNo},email='${EmailId}' where id=${id}`;
                await runOnDB(query,user, password, host, port, database)
                .then(()=>{
                    res.code(200).send({
                        statusCode:200,
                        message:"Data Updated Successfully."
                    });
                })
                .catch(err=>{
                    throw err;
                })
                
            } catch (error) {
                return res.code(statusCode).send(error);
            }
        }
    })

    next();
}