const StudentAccount = require("../modals/Student/AccountHolder");
const StudentDetails = require("../modals/Student/Details");
const RefreshToken = require("../modals/Token/RefreshTokens");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/credentials/config");
const bcrypt = require("bcrypt");
var date = new Date();
const secretkey = "adem001";
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
        const UserDetailsFound = await StudentDetails.findById(element).select(
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
    const StudentFound = await StudentDetails.findOne({ _id: reqData.stu_id });
    console.log(StudentFound);
    if (!StudentFound)
      return res.status(400).send("Invaild UserName Or Password");
    let hasValidPass = await bcrypt.compare(reqData.passcode, StudentFound.pwd);
    if (!hasValidPass) throw { message: "Invalid email or password" };

    console.log(StudentFound, StudentFound.pwd, "=", reqData.passcode);
    StudentFound.pwd = "";
    let refreshToken = await RefreshToken.createToken(StudentFound);
    jwt.sign(
      { StudentFound },
      secretkey,
      { expiresIn: "1day" },
      (err, token) => {
        res.json({
          token,
          type: "Bareer",
          refreshToken,
          StudentFound,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// refertoken generator
exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    console.log(RefreshToken.verifyExpiration(refreshToken));
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, secretkey, {
      expiresIn: process.env.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.log(err);
    // return res.status(500).send({ message: err });
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

// //post Registerauth
// exports.PostRegisterauth = async (req, res) => {
//   const reqData = req.body;
//   console.log("req body", reqData);
//   try {
//     const PostRegisterauth = new registerAuth({
//       stu_id: reqData.stu_id,
//       stu_name: reqData.stu_name,
//       email: reqData.email,
//       contact: reqData.contact,
//       dob: reqData.dob,
//       gender: reqData.gender,
//       city: reqData.city,
//       acc_id: reqData.acc_id,
//       sch_id: reqData.sch_id,
//       p_g_name: reqData.p_g_name,
//       relation: reqData.relation,
//       p_g_email: reqData.p_g_email,
//       p_g_contact: reqData.p_g_contact,
//       pwd: reqData.pwd,
//       assign_teacher: reqData.assign_teacher,
//     });
//     const savePostRegisterauth = await PostRegisterauth.save();
//     res.status(200).json(savePostRegisterauth);
//   } catch (err) {
//     console.log(err);
//   }
// };
