exports.SchoolLoginValidate = function SchoolLoginValidate(reqData){
    if(reqData.passcode.length == 0 || reqData.passcode.length == "" || reqData.stu_id.length == ""  || reqData.stu_id.length == 0){
        return false;
    }else{
        return reqData;
    }
} 

exports.SchoolPhoneValidate = function SchoolPhoneValidate(reqData){
    if(reqData.phone.length == 0){
        return false;
    }
    else{
        return reqData;
    }
}