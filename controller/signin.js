const StudentAccount = require("../modals/Student/AccountHolder");
const StudentDetails = require("../modals/Student/Details")
const jwt = require("jsonwebtoken");
const { SECRET } = require('../config/credentials/config');
const bcrypt = require('bcrypt');
var date = new Date();
const secretkey = "adem001"
// CheckAccount
exports.CheckAccount = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const AccountFound = await StudentAccount.findOne({
      ph_num: reqData.ph_num,
    }).select("stu_id verify");
    if (!AccountFound) {
      return res.status(400).json({ message: "account not found" });
    } else {
      console.log(AccountFound, "fghjkl;");
      if (AccountFound?.verify == false)
        return res.status(400).json({ message: "not verify" });
      var data = [];
      for (let index = 0; index < AccountFound.stu_id.length; index++) {
        const element = AccountFound.stu_id[index];
        const UserDetialsFound = await StudentDetails.findById(element).select(
          "_id stu_name"
        );
        data.push(UserDetailsFound);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

// Student Login
exports.StudentLogin = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData.stu_id);
  try {
    const StudentFound = await StudentDetails.findOne({_id:reqData.stu_id})
        if (!StudentFound) return res.status(400).send("Invaild UserName Or Password")
        if(StudentFound.pwd != reqData.passcode) return res.status(400).send("Invaild UserName Or Password 1")
        console.log(StudentFound, StudentFound.pwd ,"=", reqData.passcode);

            jwt.sign({StudentFound}, secretkey, { expiresIn: "1day" }, (err, token) => {
              StudentFound.pwd = ""
              res.json({
                token, StudentFound
              });
            });
        }
        catch(err){
            console.log(err)
        }
      }
  

// Verify Account

exports.VerifyAccount = async (req, res) => {
  try {
    const otp = req.body.otp;
    const phone = req.body.phone;
    const AccountFound = await StudentAccount.findOne({ ph_num: phone });
    if (AccountFound?.verify == true)
      return res.status(400).json({ message: "already verified" });
    if (AccountFound.ph_num.slice(-4) != otp) {
      return res.status(200).json({ message: "otp not match" });
    } else {
      AccountFound.verify = true;
      AccountFound.save();
      var data = [];
      for (let index = 0; index < AccountFound.stu_id.length; index++) {
        const element = AccountFound.stu_id[index];
        const UserDetailsFound = await StudentDetails.findById(element).select(
          "_id stu_name"
        );
        data.push(UserDetailsFound);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// select user account
exports.SelectAccount = async (req, res) => {
  try {
    const stu_id = req.body.stu_id;
    const DetailsFound = await StudentDetails.findById(stu_id).select(
      "_id stu_name std"
    );
    if (!DetailsFound)
      return res.status(400).json({ message: "Record not Found" });
    return res.status(200).json(DetailsFound);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// set-passcode
exports.SetPasscode = async (req, res) => {
  try {
    const passcode = req.body.passcode;
    const confirm_passcode = req.body.confirm_passcode;
    const student_id = req.body.student_id;
    if (passcode != confirm_passcode)
      return res
        .status(400)
        .json({ message: "Passcode & Confirm Passcode not Match" });
    const DetailsFound = await StudentDetails.findById(student_id);
    if (!DetailsFound)
      return res.status(400).json({ message: "Details not Found" });

    DetailsFound.pwd = passcode;
    DetailsFound.verify = true;
    const setPassword = await DetailsFound.save();
    return res
      .status(200)
      .json({ message: `Passcode set to ${DetailsFound.stu_name}` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


