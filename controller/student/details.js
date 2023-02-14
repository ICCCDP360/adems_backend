const StudentDetails = require("../../modals/Student/Details");
var date = new Date();

//Get Studentdetails
exports.GetDetails = async (req, res) => {
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

// Post Studentdetails
exports.PostDetails = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const PostDetails = new StudentDetails({
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
    const savePostDetails = await PostDetails.save();
    res.status(200).json(savePostDetails);
  } catch (err) {
    console.log(err);
  }
};

//Put or Update Studentdetails
exports.PutDetails = async (req, res) => {
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
exports.GetbyidDetails = async (req, res) => {
  try {
    const detailsFound = await StudentDetails.findById(req.params.id);
    res.status(200).json(detailsFound);
  } catch (err) {
    console.log(err);
  }
};
