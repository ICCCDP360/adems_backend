const StudentAccount = require("../modals/Student/AccountHolder");
const StudentDetials = require("../modals/Student/Details")
const jwt = require("jsonwebtoken");
var date = new Date();

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
        const UserDetialsFound = await StudentDetials.findById(element).select(
          "_id stu_name"
        );
        data.push(UserDetialsFound);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

// Studen Login
exports.StudentLogin = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const studentFound = await StudentDetials.findById(reqData.student_id);
    if (studentFound.pwd != reqData.passcode)
      return res.status(404).json({ message: "Invaild Passcode" });
    studentFound.pwd = "" 
    return res.status(200).json(studentFound);
  } catch (error) {
    if (error.message.split(" failed for value")[0]=="Cast to ObjectId")
      return res.status(404).json({ message: "Invaild User" });
    return res.status(200).json({ message: error.message });
  }
};

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
        const UserDetialsFound = await StudentDetials.findById(element).select(
          "_id stu_name"
        );
        data.push(UserDetialsFound);
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
    const DetailsFound = await StudentDetials.findById(stu_id).select(
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
        .json({ message: "Passcode & Confirm Passweord not Match" });
    const DetailsFound = await StudentDetials.findById(student_id);
    if (!DetailsFound)
      return res.status(400).json({ message: "Details not Found" });

    DetailsFound.pwd = passcode;
    DetailsFound.verify = true;
    const setPassword = await DetailsFound.save();
    return res
      .status(200)
      .json({ message: `password set to ${DetailsFound.stu_name}` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
