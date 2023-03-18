const question_answer = require("../../modals/Student tasks/Concept");
var date = new Date();

//Get Q&A
exports.GetQuestion_answer = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    question_answer.find().exec(function (err, users) {
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

//Post Q&A
exports.PostQuestion_answer = async (req, res) => {
    const reqData = req.body;
    console.log("req body", reqData);
    try {
      const Question_answer = new question_answer({
        question_id:reqData.question_id,
        question_ans:reqData.question_ans,
        user_id:reqData.user_id,
        faq:reqData.faq,
        like:reqData.like,
        dislike:reqData.dislike,
        content_id:reqData.content_id,
        content:reqData.content
      });
      const savePostQuestion_answer = await Question_answer.save();
      res.status(200).json(savePostQuestion_answer);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };