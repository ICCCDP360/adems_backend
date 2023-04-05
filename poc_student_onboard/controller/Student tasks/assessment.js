const assessment = require("../../modals/Student tasks/Assessment");
let date = new Date();

//Get Assessment
exports.GetAssessment = async (req, res) => {
  let lang = req.query.lang;
  try {
    // get all data
    assessment.find({ lang_type: req.query.lang || "english" }).exec(function (err, users) {
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

        return res.status(200).json(dataSet);
      } else if (err) {
        return res.status(400).send("no data found : ", err);
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Post Assessment
exports.PostAssessment = async (req, res) => {
  const reqData = req.body;
  try {
    const Assessment = new assessment({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
      title: reqData.title,
      thumnail: reqData.thumnail,
      category: reqData.category,
      lang_type: reqData.lang_type,
      std: reqData.std,
      questions: reqData.questions,
      no_of_chapters: reqData.no_of_chapters,
      status: reqData.status,
      status_percentage: reqData.status_percentage,
      task_id: reqData.task_id,
      duration: reqData.duration,
      size: reqData.size,
      created_by: reqData.created_by,
      reviewed_by: reqData.reviewed_by,
      approved_by: reqData.approved_by,
    });
    const savePostAssessment = await Assessment.save();
    res.status(200).json(savePostAssessment);
  } catch (err) {
    if (err.message.split(" ")[0] == "A1000") {
      return res.status(400).json({ message: "already exist" });
    } else {
      return res.status(400).json({ message: err.message });
    }
  }
};

// Getbyid Assessment

exports.GetbyidAssessment = async (req, res) => {
  try {
    const assessmentFound = await assessment.findById(req.query.id);
    return res.status(200).json(assessmentFound);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.getAssesmentQuestionsByLanguageType = async (req, res) => {
  try {
    const assessmentQuestions = await assessment.find({
      lang_type: req.body.lang_type
    }, { "_id": 0, "questions": 1, "status": 2 });
    return res.status(200).json(assessmentQuestions);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//Get AssessmentPagination
exports.GetAssessmentPagination = async (req, res) => {

  // destructure page and limit and set default values
  const { page = 1, limit = 10, lang = "english" } = req.query;

  try {
    // execute query with page and limit values
    const assessmentpagination = await assessment
      .find({ lang_type: lang })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await assessment.find({ lang_type: lang }).count()

    // return response with posts, total pages, and current page
    return res.json({
      assessmentpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Getbyid AssessmentPagination
exports.GetbyidAssessmentPagination = async (req, res) => {

  // destructure page and limit and set default values
  const { page = 1, limit = 10, lang = "english" } = req.query;

  try {
    // execute query with page and limit values
    const assessmentidpagination = await assessment
      .find({ lang_type: lang })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await assessment.find({ lang_type: lang }).count()

    // return response with posts, total pages, and current page
    return res.json({
      assessmentidpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};