
function validateInputValue(fname,lname,email,mobileno){

}const validator = require('validator');

function validateMobileNo(number)
{
    if(/[0-9]{10}$/.test(number))
        return;
    else    
        return ({
            statusCode:422,
            error:"Unprocessable Entity",
            message:"Enter valid contact number."
        });
}
function validateEmail(mail){
    if(validator.isEmail(mail))
    {
        return;
    }else{
        return({
            statusCode:422,
            error:"Unprocessable Entity",
            message:"Enter valid Email ID."
        });
    }
}
function validateInputValue(fname,lname,mobileno,email){
    if(fname === 'string' || lname === 'string' || mobileno === 0 || email === 'string')
    {
        return ({
            statusCode:400,
            error:"Bad Request",
            message:"Enter valid values to be Insert."
        });
    }
    else if(fname === "" || lname === "" || mobileno === 0 || email === "")
    {
        return ({
            statusCode:400,
            error:"Bad Request",
            message:"Values can't be Null"
        });
    }
}
module.exports = {
    validateMobileNo,
    validateEmail,
    validateInputValue,
}