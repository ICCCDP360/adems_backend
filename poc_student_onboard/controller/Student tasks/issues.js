const issues = require("../../modals/Student tasks/Issues");
var date = new Date();

//Get Issues
exports.GetIssues = async (req, res) => {
    let { lang = "english" } = req.query;
    try {
      issues
        .find({ lang_type: lang || "english" })
        .exec(function (err, issuesresults) {
          if (issuesresults) {
            return res.status(200).json(issuesresults);
          } else if (err) {
            return res.status(400).send("no data found : ", err);
          }
        });
    } catch (err) {
      return res.status(400).json(err);
    }
  };
  
  // Post Issues
  exports.PostIssues = async (req, res) => {
    const reqData = req.body;
    try {
      const Issues = new issues({
        assessment_id: reqData.assessment_id,
        question_id: reqData.question_id,
        student_id: reqData.student_id,
        lang_type: reqData.lang_type,
        issues_type: reqData.issues_type
      });
      const savePostIssues = await Issues.save();
      return res.status(200).json(savePostIssues);
    } catch (err) {
      return res.status(400).json(err);
    }
  };
  
  // Getbystudentid Issues
  
  exports.GetbystudentidIssues = async (req, res) => {
    try {
      const issuesFound = await issues.find({student_id:req.params.student_id});
      return res.status(200).json(issuesFound);
    } catch (err) {
      return res.status(400).json(err);
    }
  };
  
  // Getbystudentid IssuesPagination
  exports.GetbystudentidIssuesPagination = async(req,res) => {
    const { page = 1, limit =10,lang="english", student_id} = req.query;
  
    try{
      const issuespagination = await issues
      .find({lang_type:lang,student_id: student_id})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
  
      const count = await issues.find({lang_type:lang,student_id:student_id}).count()
  
      return res.json({
        issuespagination,
        totalPages:Math.ceil(count/limit),
        currentPage:page
      });
    }catch(err){
      return res.status(404).json(err);
    }
  }