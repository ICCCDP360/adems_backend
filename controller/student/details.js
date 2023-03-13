const SchoolDetails = require("../../modals/school principal/School");
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
      stu_id:reqData.stu_id,
      name: reqData.name,
      email: reqData.email,
      phone: reqData.phone,
      std:reqData.std,
      sec:reqData.sec,
      roll_no:reqData.roll_no,
      dob: reqData.dob,
      gender: reqData.gender,
      city: reqData.city,
      state: reqData.state,
      acc_id: reqData.acc_id,
      sch_id: reqData.sch_id, 
      passcode: reqData.passcode,
      points:reqData.points,
      assign_teacher: reqData.assign_teacher,
      verify:reqData.verify
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
    res.status(404).json(err);
  }
};


exports.getByIdProfileDetails = async (req, res) => {
  try{
    const profileDetailsFound = await StudentDetails.findById(req.params.id);
    const SchoolDetailsFound = await SchoolDetails.findOne({sch_id:profileDetailsFound.sch_id});
    res.status(200).json({"studentDetails":profileDetailsFound,"schoolDetails":SchoolDetailsFound});
  }catch(err){
    console.log(err);
    res.status(404).json(err);
  }
}