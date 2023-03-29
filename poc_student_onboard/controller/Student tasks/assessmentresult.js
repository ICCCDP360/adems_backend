const assessmentresult = require("../../modals/Student tasks/Assessmentresult");
var date = new Date();

//Get AssessmentResult
exports.GetAssessmentResult = async (req, res) => {
  let { lang = "english" } = req.query;
  try {
    assessmentresult
      .find({ lang_type: lang || "english" })
      .exec(function (err, assessmentresults) {
        if (assessmentresults) {
          return res.status(200).json(assessmentresults);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Post AssessmentResult
exports.PostAssessmentResult = async (req, res) => {
  const reqData = req.body;
  try {
    const AssessmentResult = new assessmentresult({
      lang_type: reqData.lang_type,
      user_id: reqData.user_id,
      assessment_id: reqData.assessment_id,
      assessment_result: reqData.assessment_result,
    });
    const savePostAssessmentResult = await AssessmentResult.save();
    return res.status(200).json(savePostAssessmentResult);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Getbyid Assessment

exports.GetbystudentidAssessmentResult = async (req, res) => {
  try {
    const assessmentResultsFound = await assessmentresult.find({user_id:req.query.user_id});
    return res.status(200).json(assessmentResultsFound);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};