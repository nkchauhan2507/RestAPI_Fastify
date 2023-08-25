const GET_retrieveEmpSchema = {
    description: 'getting user',
    tags: ['Employee related operation'],
    summary: '1.0.0',
    params: {
        empid: {
            type: 'string',
            description: 'enter emp id'
        }
    }
    // ,
    // security:[{
    //     "apiKey":[]
    // }]
}

const POST_insertEmpSchema = {
    description: 'This API is useful for inserting Employee records to the Database',
    tags: ['Employee related operation'],
    summary: '1.0.0',
    body: {
        type: 'object',
        properties: {
            firstName: {
                type: 'string',
                description: 'Please provide FirstName'
            },
            lastName: {
                type: 'string',
                description: 'Please provide LastName'
            },
            ContactNo: {
                type: 'string',
                description: 'Please provide Contact Number'
            },
            EmailId: {
                type: 'string',
                description: 'Please provide Email ID'
            }
        },
        required: ['firstName', 'lastName', 'ContactNo', 'EmailId']
    }
    // ,
    // security:[
    //     {
    //         "apiKey":[]
    //     }
    // ]
}
const deleteEmpSchema = {
    description: 'This API is useful for inserting Employee records to the Database',
    tags: ['Employee related operation'],
    summary: '1.0.0',
    params: {
        id: {
            type: 'string',
            description: 'Please provide Employee ID which you want to delete.'
        }
    }
    // ,
    // security:[
    //     {
    //         "apiKey":[]
    //     }
    // ]
}

const PATCH_updateEmpSchema = {
    description: 'This API is useful for updating few fields of Employee records by given ID',
    tags: ['Employee related operation'],
    summary: '1.0.0',
    params: {
        id: {
            type: 'integer',
            description: 'Enter id of Employee whose data you want to delete.'
        }
    },
    body: {
        type: 'object',
        properties: {
            fname: {
                type: 'string',
                description: 'Enter fname of Employee'
            },
            lname: {
                type: 'string',
                description: 'Enter lname of Employee'
            }
        },
        required: ['fname', 'lname']
    }
    // ,
    // security:[
    //     {
    //         "apiKey":[]
    //     }
    // ]
}

const PUT_updateEmpSchema = {
    description: 'This API is useful for updating All fields of Employee records by given ID',
    tags: ['Employee related operation'],
    summary: '1.0.0',
    params: {
        id: {
            type: 'integer',
            description: 'Enter id of Employee whose data you want to delete.'
        }
    },
    body: {
        type: 'object',
        properties: {
            fname: {
                type: 'string',
                description: 'Enter fname of Employee'
            },
            lname: {
                type: 'string',
                description: 'Enter lname of Employee'
            },
            ContactNo: {
                type: 'numeric',
                description: 'Enter ContactNo of Employee'
            },
            EmailId: {
                type: 'string',
                description: 'Enter Email ID of Employee'
            }
        }
        // ,
        // required:['fname','lname','ContactNo','EmailId']
    }
    // ,
    // security:[
    //     {
    //         "apiKey":[]
    //     }
    // ]
}

const getToken = {
    description: 'This API is useful for retrieve Token.',
    tags: [`Token related API's`],
    summary: '1.0.0',
    params: {
        username: {
            type: 'string',
            description: 'Enter Username'
        },
        email: {
            type: 'string',
            description: 'Enter Email ID'
        }
    }
}

const generateToken = {
    description: 'This API is useful for Generate Token ',
    tags: [`Token related API's`],
    summary: '1.0.0',
    body: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                description: 'Enter Username'
            },
            email: {
                type: 'string',
                description: 'Enter Email ID'
            },
            API_type: {
                type: 'string',
                description: 'Enter Type of API',
                default:'Testing'
            }
        }
    }
}
module.exports = {
    POST_insertEmpSchema,
    GET_retrieveEmpSchema,
    PATCH_updateEmpSchema,
    PUT_updateEmpSchema,
    deleteEmpSchema,
    getToken,
    generateToken
}