const registerAuth = require("../modals/Registerauth")
var date =new Date();

//post Registerauth
exports.PostRegisterauth= async(req,res) => {
    const reqData = req.body
    try{
        const PostRegisterauth = new registerAuth (
            {
                stu_id: reqData.stu_id,
                stu_name: reqData.stu_name,
                std:reqData.std,
                email: reqData.email,
                contact: reqData.contact,
                dob: reqData.dob,
                gender: reqData.gender,
                city: reqData.city,
                acc_id: reqData.acc_id,
                sch_id: reqData.sch_id,
                p_g_name: reqData.p_g_name,
                relation: reqData.relation,
                p_g_email: reqData.p_g_email,
                p_g_contact: reqData.p_g_contact,
                passcode: reqData.passcode,
                assign_teacher: reqData.assign_teacher,
                verify:reqData.verify
                
            }
        )
        const savePostRegisterauth=await PostRegisterauth.save()
        return res.status(200).json(savePostRegisterauth);
    }
    catch(err){
        return res.status(404).json(err);
    }
};
























































































