const StudentAccount = require("../modals/Student/AccountHolder");
const StudentDetails = require("../modals/Student/Details");
const RefreshToken = require("../modals/Token/RefreshTokens");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/credentials/config");
const bcrypt = require("bcrypt");
const AccountHolder = require("../modals/Student/AccountHolder");
const School = require("../modals/school principal/School");
var date = new Date();
const secretkey = "adem001";
// CheckAccount
exports.CheckAccount = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const AccountFound = await StudentAccount.findOne({
      phone: reqData.phone,
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
          "_id name"
        );
        data.push(UserDetailsFound);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Student Login
exports.StudentLogin = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData.stu_id);
  try {
    var schoolFound = [];
    var parentFound = [];
    const StudentFound = await StudentDetails.findOne({ _id: reqData.stu_id });
    if (!StudentFound)
      return res.status(400).send("Invaild UserName Or Password");
    let hasValidPass = await bcrypt.compare(
      reqData.passcode,
      StudentFound.passcode
    );
    if (!hasValidPass) throw { message: "Invalid email or password" };
    StudentFound.passcode = "";
    try {
      schoolFound = await School.findOne({
        sch_id: StudentFound.sch_id,//.slice(-1)[0],
      });
      if (!schoolFound) {
        schoolFound = { message: "school not found" };
      }
    } catch (error) {
      console.log(error.message);
    }

    try {
      parentFound = await StudentAccount.findOne({
        _id: StudentFound.acc_id,//.slice(-1)[0],
      });
      if (!parentFound) {
        parentFound = { message: "school not found" };
      }
    } catch (error) {
      console.log(error.message);
    }

    let refreshToken = await RefreshToken.createToken(StudentFound);
    var otherACC = [];
    const FindOtherAccount = await AccountHolder.findById(StudentFound.acc_id);
    for (let index = 0; index < FindOtherAccount.stu_id.length; index++) {
      const element = FindOtherAccount.stu_id[index];
      console.log(element != StudentFound._id);
      if (element != StudentFound._id) {
        console.log(element, "tfyguhijok");

        const accD = await StudentDetails.findById(element).select(
          "email name dp"
        );
        if (accD) otherACC.push(accD);
      }
    }

    jwt.sign(
      { StudentFound },
      secretkey,
      { expiresIn: "1day" },
      (err, token) => {
        res.json({
          token,
          otherACC,
          type: "Bearer",
          refreshToken,
          StudentFound,
          schoolFound,
          parentFound
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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
    return res.status(400).send({ message: err });
  }
};

// Verify Account

exports.VerifyAccount = async (req, res) => {
  try {
    const otp = req.body.otp;
    const phone = req.body.phone;
    const AccountFound = await StudentAccount.findOne({ phone: phone });
    if (AccountFound?.verify == true)
      return res.status(400).json({ message: "already verified" });
    if (AccountFound.phone.slice(-4) != otp) {
      return res.status(200).json({ message: "otp not match" });
    } else {
      AccountFound.verify = true;
      AccountFound.save();
      var data = [];
      for (let index = 0; index < AccountFound.stu_id.length; index++) {
        const element = AccountFound.stu_id[index];
        const UserDetailsFound = await StudentDetails.findById(element).select(
          "_id name"
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
      "_id name std"
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

    DetailsFound.passcode = passcode;
    DetailsFound.verify = true;
    const setPassword = await DetailsFound.save();
    return res
      .status(200)
      .json({ message: `Passcode set to ${DetailsFound.stu_name}` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// change-passcode
exports.ChangePasscode = async (req, res) => {
  console.log('body',req.body);
  return res.status(200).json({"message":"Test"});
  try {
    const StudentFound = await StudentDetails.find({ _id: req.body.stu_id });
    if (!StudentFound)
      return res.status(400).send("Invaild Password");
    let hasValidPass = await bcrypt.compare(
      re.body.passcode,
      StudentFound.passcode
    );
    if (!hasValidPass) throw { message: "Invalid password" };
    return res.status(200).json(StudentFound,hasValidPass);
  } catch (error) {
    return res.status(400).json(error);
  }
};
