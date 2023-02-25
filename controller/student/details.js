const StudentDetails = require("../../modals/Student/Details");
var date = new Date();

//Get Studentdetails
exports.getStudentDetails = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    StudentDetails.find().exec(function (err, users) {
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

//post Registerauth
exports.addStudentDetails = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const StudentRegister = new StudentDetails({
      stu_id: reqData.stu_id,
      stu_name: reqData.stu_name,
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
      pwd: reqData.pwd,
      assign_teacher: reqData.assign_teacher,
    });
    const Respone = await StudentRegister.save();
    res.status(200).json(Respone);
  } catch (err) {
    console.log(err);
  }
};

//Put or Update Studentdetails
exports.updateStudentDetail = async (req, res) => {
  const reqData = req.body;
  const id = req.params.id;
  console.log("req body", id);
  //console.log("print data from frontend", id)

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
    console.log(detailsFound);
    if (!detailsFound) return res.status(400).send("no data found");
    console.log("kl", detailsFound);
    return res.status(200).json(detailsFound);
  } catch (err) {
    console.log(err);
  }
};

//Getbyid Studentdetails
exports.getByIdStudentDetails = async (req, res) => {
  try {
    const detailsFound = await StudentDetails.findById(req.params.id);
    res.status(200).json(detailsFound);
  } catch (err) {
    console.log(err);
  }
};
