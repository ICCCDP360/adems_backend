const School = require("../../modals/school principal/School");
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
      name: reqData.name,
      email: reqData.email,
      phone: reqData.phone,
      std:reqData.std,
      sec:reqData.sec,
      roll_no:reqData.roll_no,
      dob: reqData.dob,
      gender: reqData.gender,
      city: reqData.city,
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
  }
};

//Post onBoard 
exports.postOnBoard = async (req, res) => {
  try {
    const reqData = req.body;
    var fs = require('fs'); 
    var csvjson = require('csvjson');
    console.log('REQUEST DATA',reqData);
    console.log(req.body.files);
    //var data = fs.readFileSync((__dirname, 'school.csv'), { encoding : 'utf8'});
    var data = fs.readFileSync((__dirname, req.body.files), { encoding : 'utf8'});
    var options = {
      delimiter : ',', // optional
      quote     : '"' // optional
    };
    //console.log(csvjson.toArray(data, options));
    console.log(csvjson.toColumnArray(data,options));
    // console.log(req.files.fileName.data.toString());
    // res.status(200).json({"message":"Upload Successfully"});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Profile Details
exports.getProfileDetails = async (req, res) => {
  console.log(req.body);
  try {
    const studentDetailsFound = await StudentDetails.find({"_id":req.params.id},{"passcode":0});
    const schoolDetailsFound = await School.find({"sch_id":studentDetailsFound[0].sch_id[0]},{"passcode":0});
    res.status(200).json({"studentDetails":studentDetailsFound,"schoolDetails":schoolDetailsFound});
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};