const ASSESSMENTRESULT = require("../../modals/Student tasks/Assessmentresult");
var date = new Date();

//Get AssessmentResult
exports.GetAssessmentResult = async (req, res) => {
  let { lang = "english" } = req.query;
  try {
    ASSESSMENTRESULT
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
    const AssessmentResult = new ASSESSMENTRESULT({
      assessment_id: reqData.assessment_id,
      student_id: reqData.student_id,
      lang_type: reqData.lang_type,
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
    const assessmentResultsFound = await ASSESSMENTRESULT.find({student_id:req.query.student_id});
    return res.status(200).json(assessmentResultsFound);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// Getbyid AssessmentResultPagination
exports.GetbystudentidAssessmentResultPagination = async(req,res) => {
  const { page = 1, limit =10,lang="english", student_id} = req.query;

  try{
    const assessmentresultpagination = await ASSESSMENTRESULT
    .find({lang_type:lang,student_id: student_id})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

    const count = await ASSESSMENTRESULT.find({lang_type:lang,student_id:student_id}).count()

    return res.json({
      assessmentresultpagination,
      totalPages:Math.ceil(count/limit),
      currentPage:page
    });
  }catch(err){
    return res.status(404).json(err);
  }
}