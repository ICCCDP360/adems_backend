const concept = require("../../modals/Student tasks/Concept");
var date = new Date();

//Get Concept
exports.GetConcept = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    concept.find().exec(function (err, users) {
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

//Post Concept
exports.PostConcept = async (req, res) => {
    const reqData = req.body;
    console.log("req body", reqData);
    try {
      const Concept = new concept({
        name:reqData.name,
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
        myconcept_id:reqData.myconcept_id
      });
      const savePostConcept = await Concept.save();
      res.status(200).json(savePostConcept);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };

// Getbyid Concept
exports.GetbyidConcept = async(req,res)=>{
    try {
        const conceptFound = await concept.find({_id:req.query.id});
        res.status(200).json(conceptFound);
      } catch (err) {
        console.log(err);
        res.status(404).json(err)
      }
};