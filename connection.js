const {Client} = require('pg');

function runOnDB(querystr,username,pass,hostname,portno,dbname){
    return new Promise(async(resolve,reject)=>{
        const client = new Client({
            user:username,
            host:hostname,
            password:pass,
            database:dbname,
            port:portno
        })
        client.connect((err)=>{
            if(err){
                return reject(err)
            }
        })
        client.query(querystr,(err,result)=>{
            client.end()
            if(err)
            {
                return reject(err);
            }else{
                if(result)
                {
                    return resolve(result);
                }
            }
        })
    })
}

module.exports ={runOnDB};