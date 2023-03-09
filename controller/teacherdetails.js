const TeacherDetails = require("../modals/Teacherdetails");
var date = new Date();

//Get Teacherdetails
exports.getDetails = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    TeacherDetails.find().exec(function (err, users) {
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

// Post teacherdetails
exports.createDetails = async (req, res) => {
  const reqData = req.body;
  console.log("print data fron frontend", reqData);
  try {
    const PostTeacherDetails = new TeacherDetails({
      teacher_id: reqData.teacher_id,
      teacher_name: reqData.teacher_name,
      phn_num: reqData.phn_num,
      classes: reqData.classes,
      subjects: reqData.subjects,
    });
    const savePostTeacherDetails = await PostTeacherDetails.save();
    res.status(200).json(savePostTeacherDetails);
  } catch (err) {
    console.log(err);
  }
};

//Put or Update teacherdetails
exports.updateDetails = async (req, res) => {
  const reqData = req.body;
  const id = req.params.id;
  console.log("print data", id);
  //console.log("print data from frontend", id)

  try {
    // get user by name
    const teacherDetailsFound = await TeacherDetails.findOneAndUpdate(
      { _id: id },
      reqData,
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );
    console.log(teacherDetailsFound);
    if (!teacherDetailsFound) return res.status(400).send("no profile found");
    console.log("kl", teacherDetailsFound);
    return res.status(200).json(teacherDetailsFound);
  } catch (err) {
    console.log(err);
  }
};
//Delete Teacherdetails
exports.deleteDetails = async (req, res) => {
  try {
    const deleteFound = await TeacherDetails.findOneAndDelete(req.params.id);
    return res.status(200).json("database deleted success" + deleteFound);
  } catch (err) {
    console.log(err);
  }
};

// Getbyid teacherdetails
exports.getByIdDetails = async (req, res) => {
  try {
    const teacherDetailsFound = await TeacherDetails.findById(req.params.id);
    res.status(200).json(teacherDetailsFound);
  } catch (err) {
    console.log(err);
  }
};
