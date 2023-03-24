const mytask = require("../../modals/Student tasks/Mytask");
const StudentDetails = require("../../../modals/Student/Details");
const Mytask = require("../../modals/Student tasks/Mytask");
var date = new Date();

//Get Mytask
exports.GetMytask = async (req, res) => {
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
    return res.status(404).json(err);
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
    const mytaskFound = await mytask.find({
      stu_id: { $in: student_ids },
      lang_type: req.query.lang || "english",
    });
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
      std: filteredStd,
      lang_type: req.query.lang || "english",
    });
    return res.status(200).json(completedFound);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

//Get GetMytaskPagination
exports.GetMytaskPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10, lang = "english" } = req.query;

  try {
    // execute query with page and limit values
    const mytaskpagination = await Mytask.find({ lang_type: lang })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await Mytask.find({ lang_type: lang }); //await Mytask.countDocuments();

    // return response with posts, total pages, and current page
    res.json({
      mytaskpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
};

//Get GetStudentMytaskPagination
exports.GetbyidStudentMytaskPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10, lang = "english" } = req.query;

  let student_id = req.params.stu_id;
  let student_ids = [student_id];

  try {
    // execute query with page and limit values
    const studentmytaskpagination = await Mytask.find({
      stu_id: { $in: student_ids },
      lang_type: lang,
    },{_id:1,name:2,category:3,myconcept_id:4,status:5,assessment_count:6,video_count:7,practice_count:8})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await Mytask.find({
      stu_id: { $in: student_ids },
      lang_type: lang,
    }).count(); //await Mytask.countDocuments();

    // return response with posts, total pages, and current page
    res.json({
      studentmytaskpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
};

//Get GetCompletedPagination
exports.GetbyidCompletedPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10, percentage = 40 } = req.query;

  if (percentage > 100) {
    return res
      .status(400)
      .json({ message: "not more than 100 percentage given" });
  }

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
    // execute query with page and limit values
    const completedpagination = await mytask
      .find({
        stu_id: { $in: student_ids },
        completed_percentage: req.query.percentage || 100,
        std: filteredStd,
        lang_type: req.query.lang || "english",
      },{_id:1,name:2,category:3,myconcept_id:4,status:5,assessment_count:6,video_count:7,practice_count:8})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await mytask
      .find({
        stu_id: { $in: student_ids },
        completed_percentage: req.query.percentage || 100,
        std: filteredStd,
        lang_type: req.query.lang || "english",
      })
      .count(); //await Mytask.countDocuments();

    // return response with posts, total pages, and current page
    res.json({
      completedpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
};
