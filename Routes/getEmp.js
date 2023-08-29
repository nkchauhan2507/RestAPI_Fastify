const { GET_retrieveEmpSchema } = require('../Schema/schema')
require("dotenv").config({ "path": `${__dirname}/config.env` })
const { GET_getEmp } = require('../URL')
const { runOnDB } = require('../connection')


module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'GET',
        url: `/${GET_getEmp}/:empid`,
        schema: GET_retrieveEmpSchema,
        handler: async (request, response) => {
            const { user, password, host, port, database } = process.env;
            if (request.params.empid == '*') {
                let query = `select firstname,lastname,mobileno,email from "Emp"`;
                await runOnDB(query, user, password, host, port, database)
                    .then((result) => {
                        if (result.rowCount > 0) {
                            response.send(result.rows);
                        } else {
                            response.code(400).send({
                                "statusCode": 400,
                                "error": "Unprocessable Entiry",
                                "message": "Enterd"
                            })
                        }
                    })
                    .catch((err) => {
                        response.send(err);
                    })
            }
            else {
                // check weather id exists or not
                let query = `select id from "Emp" where id = ${request.params.empid}`;
                await runOnDB(query, user, password, host, port, database)
                    .then(async (result) => {
                        if (result.rowCount > 0) {
                            query = ``;
                            query = `select firstname,lastname,mobileno,email from "Emp" where id = ${request.params.empid}`;
                            await runOnDB(query, user, password, host, port, database)
                                .then((result) => {
                                    if(result.rows!=0)
                                    {
                                        response.send(result.rows);
                                    }
                                })
                                .catch((err) => {
                                    response.send(err);
                                })
                        } 
                        else
                        {
                            response.code(400).send({
                                "statusCode": 400,
                                "error": "Unprocessable Entiry",
                                "message": "No Rows found with given id."
                            })
                        }
                    })
                    .catch((err) => {
                        response.send(err);
                    })
            }
        }
    })

    next();
}