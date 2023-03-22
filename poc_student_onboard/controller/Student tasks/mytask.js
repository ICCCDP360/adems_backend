const mytask = require("../../modals/Student tasks/Mytask");
const StudentDetails = require("../../../modals/Student/Details");
var date = new Date();

//Get Mytask
exports.GetMytask = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    mytask
      .find({ lang_type: req.query.lang || "english" })
      .exec(function (err, users) {
        if (users) {
          return res.status(200).json(users);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

//Post Mytask
exports.PostMytask = async (req, res) => {
  const reqData = req.body;
  try {
    const Mytask = new mytask({
      name: reqData.name,
      std: reqData.std,
      assessment: reqData.assessment,
      pdf: reqData.pdf,
      practice: reqData.practice,
      video: reqData.video,
      category: reqData.category,
      assessment_count: reqData.assessment_count,
      practice_count: reqData.practice_count,
      video_count: reqData.video_count,
      status: reqData.status,
      assign_to: reqData.assign_to,
      myconcept_id: reqData.myconcept_id,
      stu_id: reqData.stu_id,
      completed_status: reqData.completed_status,
      completed_percentage: reqData.completed_percentage,
      additional: reqData.additional,
      lang_type: reqData.lang_type,
    });
    const savePostMytask = await Mytask.save();
    res.status(200).json(savePostMytask);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Getbyid Mytask
exports.GetbyidMytask = async (req, res) => {
  try {
    const mytaskFound = await mytask.findById(req.query.id);
    return res.status(200).json(mytaskFound);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

// Getbyid Mytask student_id
exports.GetbyidStudentMytask = async (req, res) => {
  try {
    let student_id = req.params.stu_id;
    let student_ids = [student_id];
    const StudentDetailsFound = await StudentDetails.findById(student_id);
    let student_std = StudentDetailsFound.std;
    let standard_datas = [
      { 6: "VI" },
      { 7: "VII" },
      { 8: "VIII" },
      { 9: "XI" },
      { 10: "X" },
      { 11: "XI" },
      { 12: "XII" },
    ];
    let filteredStd;
    for (let j = 0; j < standard_datas.length; j++) {
      if (standard_datas[j][student_std] != undefined) {
        filteredStd = standard_datas[j][student_std];
      }
    }
    const mytaskFound = await mytask.find({ stu_id: { $in: student_ids } });
    return res.status(200).json(mytaskFound);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

// Getbyid Task Completed
exports.GetbyidCompleted = async (req, res) => {
  try {
    if (req.query.percentage > 100) {
      return res
        .status(400)
        .json({ message: "not more than 100 percentage given" });
    }
    let student_id = req.params.stu_id;
    let student_ids = [student_id];
    const StudentDetailsFound = await StudentDetails.findById(student_id);
    let student_std = StudentDetailsFound.std;
    let standard_datas = [
      { 6: "VI" },
      { 7: "VII" },
      { 8: "VIII" },
      { 9: "XI" },
      { 10: "X" },
      { 11: "XI" },
      { 12: "XII" },
    ];
    let filteredStd;
    for (let j = 0; j < standard_datas.length; j++) {
      if (standard_datas[j][student_std] != undefined) {
        filteredStd = standard_datas[j][student_std];
      }
    }
    const completedFound = await mytask.find({
      stu_id: { $in: student_ids },
      completed_percentage: req.query.percentage || 100,
      std: filteredStd
    });
    return res.status(200).json(completedFound);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};
