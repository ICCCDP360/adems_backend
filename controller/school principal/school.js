const SchoolDetails = require("../../modals/school principal/School");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "adem001";
//Get Sch_principal
exports.getSchoolDetails = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    SchoolDetails.find()
      .select("_id sch_id sch_name address city user_name logo")
      .exec(function (err, users) {
        if (users) {
          return res.status(200).json(users);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

// Post Sch_principal
exports.addSchoolDetails = async (req, res) => {
  try {
    const reqData = req.body;
    console.log("req body", reqData);
    const PostSchool = new SchoolDetails({
      sch_id: reqData.sch_id,
      sch_name: reqData.sch_name,
      address: reqData.address,
      city: reqData.city,
      logo: reqData.logo,
      teacher: reqData.teacher,
      student: reqData.student,
      user_name: reqData.user_name,
      passcode: reqData.passcode,
      goadem_admin: reqData.goadem_admin,
    });
    const savePostSchool = await PostSchool.save();
    res.status(200).json(savePostSchool);
  } catch (err) {
    console.log(err);
  }
};

// School Login
exports.schoolAdminLogin = async (req, res) => {
  const reqData = req.body;

  console.log("req body", reqData.sch_id);
  try {
    const SchoolFound = await SchoolDetails.findOne({
      sch_id: reqData.sch_id,
    });
    if (!SchoolFound)
      return res.status(400).send("Invaild UserName Or Password");
    console.log(reqData.passcode, SchoolFound.passcode);
    let hasValidPass = await bcrypt.compare(reqData.passcode, SchoolFound.passcode);
    if (!hasValidPass) throw { message: "Invalid email or password" };
    console.log(hasValidPass, SchoolFound.passcode, "=", reqData.passcode);

    jwt.sign(
      { SchoolFound },
      secretkey,
      { expiresIn: "1day" },
      (err, token) => {
        SchoolFound.passcode = "";
        res.json({
          token,
          SchoolFound,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//Getbyid Sch_principal
exports.getByIdSchoolDetails = async (req, res) => {
  try {
    const schoolFound = await SchoolDetails.findById(req.params.id).select(
      "_id sch_id sch_name address city user_name logo"
    );
    res.status(200).json(schoolFound);
  } catch (err) {
    console.log(err);
  }
};
