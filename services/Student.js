// exports.StudentLoginValidate = function StudentLoginValidate(reqData){
//     if(reqData.passcode.length == 0 || reqData.passcode.length == "" || reqData.stu_id.length == ""  || reqData.stu_id.length == 0){
//         return false;
//     }else{
//         return reqData;
//     }
// } 

// exports.StudentPhoneValidate = function StudentPhoneValidate(reqData){
//     if(reqData.phone.length == 0){
//         return false;
//     }
//     else{
//         return reqData;
//     }
// }

const Student = require('../modals/Student/Details');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/credentials/config');

async function registerStudent(studentData) {
    let { name, email, gender, phone, passcode, repeatpasscode } = studentData;
    let errors = [];
    let checkStudent = await Student.findOne({ email });
    if (checkStudent) errors.push('This email address is already in use; ');
    if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
    // if (/(\+)?(359|0)8[789]\d{1}(|-| )\d{3}(|-| )\d{3}/.test(phoneNumber) == false) errors.push('Phone number should be a valid BG number; ' );
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; " );
    if (passcode !== repeatpasscode) errors.push("Passwords should match; " );
    if (passcode.length < 8) errors.push("Password should be at least 8 characters long; " );
    if (passcode.length > 20) errors.push("Password should be at max 20 characters long; " );
    if (errors.length >= 1) throw {message: [errors]}
    
    let student = new Student(studentData);
    return await student.save();
}

async function StudentLogin({ email, passcode }) {
    let student = await Student.findOne({ email });
    if (!user) throw { message: 'Invalid email or password' };

    let hasValidPass = await bcrypt.compare(passcode, student.passcode);
    if (!hasValidPass) throw { message: "Invalid email or password" }

    let token = jwt.sign({ _id: student._id, email: student.email, phone: student.phone, createdSells: student.createdSells.length, avatar: student.avatar }, SECRET);
    return token;
}

async function getStudent(id) {
    return await Student.findById(id).lean()
}

module.exports = {
    registerStudent,
    StudentLogin,
    getStudent
}