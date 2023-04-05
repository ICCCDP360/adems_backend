const SchoolDetails = require("../../modals/school principal/School");
const StudentDetails = require("../../modals/Student/Details");
const accountHolder = require("../../modals/Student/AccountHolder");
let date = new Date();

//Get Studentdetails
exports.getStudentDetails = async (req, res) => {
  try {
    // get all data
    StudentDetails.find().exec(function (err, users) {
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

//post Registerauth
exports.addStudentDetails = async (req, res) => {
  const reqData = req.body;
  try {
    const StudentRegister = new StudentDetails({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
      stu_id: reqData.stu_id,
      name: reqData.name,
      email: reqData.email,
      phone: reqData.phone,
      std: reqData.std,
      sec: reqData.sec,
      roll_no: reqData.roll_no,
      dob: reqData.dob,
      gender: reqData.gender,
      city: reqData.city,
      state: reqData.state,
      acc_id: reqData.acc_id,
      sch_id: reqData.sch_id,
      passcode: reqData.passcode,
      lang_type:reqData.lang_type,
      points: reqData.points,
      assign_teacher: reqData.assign_teacher,
      verify: reqData.verify,
    });
    const Respone = await StudentRegister.save();
    return res.status(200).json(Respone);
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Put or Update Studentdetails
exports.updateStudentDetail = async (req, res) => {
  const reqData = req.body;
  const id = req.params.id;

  try {
    // get user by name
    const detailsFound = await StudentDetails.findOneAndUpdate(
      { _id: id },
      reqData,
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );
    if (!detailsFound) return res.status(400).send("no data found");
    return res.status(200).json(detailsFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Getbyid Studentdetails
exports.getByIdStudentDetails = async (req, res) => {
  try {
    const detailsFound = await StudentDetails.findById(req.params.id);
    return res.status(200).json(detailsFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.getByIdProfileDetails = async (req, res) => {
  try {
    const profileDetailsFound = await StudentDetails.findById(req.params.id);
    const SchoolDetailsFound = await SchoolDetails.findOne({
      sch_id: profileDetailsFound.sch_id,
    });
    const parentDetailsFound = await accountHolder.findOne({
      _id: profileDetailsFound.acc_id,
    });
    return res
      .status(200)
      .json({
        studentDetails: profileDetailsFound,
        schoolDetails: SchoolDetailsFound,
        parentDetails: parentDetailsFound,
      });
  } catch (err) {
    return res.status(404).json(err);
  }
};
