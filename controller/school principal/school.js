const SchoolDetails = require("../../modals/school principal/School");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "adem001";
//Get Sch_principal
exports.getSchoolDetails = async (req, res) => {
  let lang = req.query.lang;
  try {
    // get all data
    SchoolDetails.find({ lang_type: req.query.lang || "english" })
      .select(
        "_id sch_id sch_name address city state user_name logo teacher student goadem_admin dt u_dt"
      )
      .exec(function (err, users) {
        if (users) {
          let dataSet = [];
          for (let index = 0; index < users.length; index++) {
            let element = users[index];
            let data = {
              header: element.type,
              lang: element.lang[lang],
              u_dt: element.u_dt,
              dt: element.dt,
            };
            dataSet.push(data);
          }
          return res.status(200).json(users);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Post Sch_principal
exports.addSchoolDetails = async (req, res) => {
  try {
    const reqData = req.body;
    const PostSchool = new SchoolDetails({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
      sch_id: reqData.sch_id,
      school_name: reqData.school_name,
      address: reqData.address,
      city: reqData.city,
      state: reqData.state,
      logo: reqData.logo,
      teacher: reqData.teacher,
      student: reqData.student,
      user_name: reqData.user_name,
      passcode: reqData.passcode,
      lang_type: reqData.lang_type,
      goadem_admin: reqData.goadem_admin,
    });
    const savePostSchool = await PostSchool.save();
    return res.status(200).json(savePostSchool);
  } catch (err) {
    return res.status(404).json(err);
  }
};

// School Login
exports.schoolAdminLogin = async (req, res) => {
  const reqData = req.body;
  try {
    const SchoolFound = await SchoolDetails.findOne({
      sch_id: reqData.sch_id,
    });
    if (!SchoolFound)
      return res.status(400).send("Invaild UserName Or Password");
    let hasValidPass = await bcrypt.compare(
      reqData.passcode,
      SchoolFound.passcode
    );
    if (!hasValidPass) throw { message: "Invalid email or password" };

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
    return res.status(404).json(err);
  }
};

//Getbyid Sch_principal
exports.getByIdSchoolDetails = async (req, res) => {
  try {
    const schoolFound = await SchoolDetails.findById(req.params.id).select(
      "_id sch_id sch_name address city user_name logo"
    );
    return res.status(200).json(schoolFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Get SchoolDetailsPagination
exports.GetSchoolDetailsPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10, lang = "english" } = req.query;

  try {
    // execute query with page and limit values
    const schooldetailspagination = await SchoolDetails
      .find({ lang_type: lang })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await SchoolDetails.find({ lang_type: lang }).count();

    // return response with posts, total pages, and current page
    return res.json({
      schooldetailspagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Getbyid SchoolDetailsPagination
exports.GetbyidSchoolDetailsPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  try {
    const schooldetailspagination = await SchoolDetails.findById(req.params.id)
      .select(
        "_id sch_id sch_name address city state user_name logo teacher student goadem_admin dt u_dt"
      )
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await SchoolDetails.findById(req.params.id).count();

    // return response with posts, total pages, and current page
    return res.json({
      schooldetailspagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};
