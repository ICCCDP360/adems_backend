const SchoolDetails = require("../modals/School");
var date = new Date();

//Get Sch_principal
exports.GetSchool = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    SchoolDetails.find().exec(function (err, users) {
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
exports.PostSchool = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const PostSchool = new school({
      sch_id: reqData.sch_id,
      sch_name: reqData.sch_name,
      address: reqData.address,
      city: reqData.city,
      teacher: reqData.teacher,
      student: reqData.student,
      user_name: reqData.user_name,
      pwd: reqData.pwd,
      goadem_admin: reqData.goadem_admin,
    });
    const savePostSchool = await PostSchool.save();
    res.status(200).json(savePostSchool);
  } catch (err) {
    console.log(err);
  }
};

//Getbyid Sch_principal
exports.GetbyidSchool = async (req, res) => {
  try {
    const schoolFound = await SchoolDetails.findById(req.params.id);
    res.status(200).json(schoolFound);
  } catch (err) {
    console.log(err);
  }
};
