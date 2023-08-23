const {GET_retrieveEmp} = require('../Schema/schema')
require("dotenv").config({"path":`${__dirname}/config.env`})
const {GET_getEmp} = require('../URL')
module.exports = function(fastify,opts,next){
    fastify.route({
        method:'GET',
        url:`/${GET_getEmp}/:empid`,
        schema:GET_retrieveEmp,
        handler: async(request,response)=>{
            const {user,password,host,port,databse} = process.env;
            if(request.params.empid == '*')
            {
                //do something
            }
            else {
                // do something
            }
        }
    })
}