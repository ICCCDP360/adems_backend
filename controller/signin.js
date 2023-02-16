const StudentAccount = require("../modals/Student/AccountHolder");
const StudentDetials = require("../modals/Student/Details");
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

// Post Signin
exports.PostSignin = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  res.status(200).json({ message: "login coming soon" });
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
