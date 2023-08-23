const GET_retrieveEmp = {
    description: 'getting user',
    tags: ['Employee related operation'],
    summary : '1.0.0',
    params:{
        empid:{
            type:'string',
            description:'enter emp id'
        }
    }
    // ,
    // security:[{
    //     "apiKey":[]
    // }]
}

module.exports = {
    GET_retrieveEmp
}