const que_ans = require("../../modals/Student tasks/Que_ans");
var date = new Date();

//Get Q&A
exports.GetQue_ans = async (req, res) => {
  try {
    // get all data
    que_ans
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

//Post Q&A
exports.PostQue_ans = async (req, res) => {
  const reqData = req.body;
  try {
    const Que_ans = new que_ans({
      question_id: reqData.question_id,
      question_ans: reqData.question_ans,
      user_id: reqData.user_id,
      faq: reqData.faq,
      like: reqData.like,
      dislike: reqData.dislike,
      content_id: reqData.content_id,
      content: reqData.content,
      lang_type: reqData.lang_type,
    });
    const savePostQue_ans = await Que_ans.save();
    return res.status(200).json(savePostQue_ans);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// Get Que_ansPagination
exports.GetQue_ansPagination = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const que_anspagination = await que_ans
      .find({ lang_type: req.query.lang || "english" })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await que_ans.find({ lang_type : req.query.lang || "english" }).count();

    return res.json({
      que_anspagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json(err);
  }
};
