const que_ans = require("../../modals/Student tasks/Que_ans");
var date = new Date();

//Get Q&A
exports.GetQue_ans = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    que_ans.find().exec(function (err, users) {
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
exports.PostQue_ans = async (req, res) => {
    const reqData = req.body;
    try {
      const Que_ans = new que_ans({
        question_id:reqData.question_id,
        question_ans:reqData.question_ans,
        user_id:reqData.user_id,
        faq:reqData.faq,
        like:reqData.like,
        dislike:reqData.dislike,
        content_id:reqData.content_id,
        content:reqData.content
      });
      const savePostQue_ans = await Que_ans.save();
      res.status(200).json(savePostQue_ans);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };