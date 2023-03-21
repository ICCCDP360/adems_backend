const mytask = require("../../modals/Student tasks/Mytask");
var date = new Date();

//Get Mytask
exports.GetMytask = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    mytask.find({lang_type:req.query.lang || 'english'}).exec(function (err, users) {
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
        name:reqData.name,
        std:reqData.std,
        assessment:reqData.assessment,
        pdf:reqData.pdf,
        practice:reqData.practice,
        video:reqData.video,
        category:reqData.category,
        assessment_count:reqData.assessment_count,
        practice_count:reqData.practice_count,
        video_count:reqData.video_count,
        status:reqData.status,
        assign_to:reqData.assign_to,
        myconcept_id:reqData.myconcept_id,
        stu_id:reqData.stu_id,
        completed_status:reqData.completed_status,
        completed_percentage:reqData.completed_percentage,
        additional:reqData.additional,
        lang_type:reqData.lang_type
      });
      const savePostMytask = await Mytask.save();
      res.status(200).json(savePostMytask);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };

// Getbyid Mytask
exports.GetbyidMytask = async (req,res)=>{
    try {
        const mytaskFound = await mytask.findById(req.query.id);
        return res.status(200).json(mytaskFound);
      } catch (err) {
        console.log(err);
        return res.status(404).json(err)
      }
};

// Getbyid Mytask student_id
exports.GetbyidMytask = async (req,res)=>{
    try {
        const mytaskFound = await mytask.find({stu_id:req.query.stu_id});
        return res.status(200).json(mytaskFound);
      } catch (err) {
        console.log(err);
        return res.status(404).json(err)
      }
};

// Getbyid Task Completed
exports.GetbyidCompleted = async (req,res)=>{
    try {
        if(req.query.percentage>100){
            return res.status(400).json({"message":"not more than 100 percentage given"})
        }
        const completedFound = await mytask.find({stu_id:req.params.stu_id,completed_percentage: req.query.percentage || 100});
        return res.status(200).json(completedFound);
      } catch (err) {
        console.log(err);
        return res.status(404).json(err)
      }
};
