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
module.exports = {
    validateMobileNo,
    validateEmail,

}