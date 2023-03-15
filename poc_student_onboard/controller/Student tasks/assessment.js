const assessment = require("../../modals/Student tasks/Assessment")
var date = new Date()

//Get Assessment
exports.GetAssessment = async (req, res) => {
    console.log(req.query.lang);
    let lang = req.query.lang;
    try {
      // get all data
      assessment.find().exec(function (err, users) {
        if (users) {
          // console.log(users);
          var dataSet = [];
          for (let index = 0; index < users.length; index++) {
            let element = users[index];
            console.log(element.lang[lang]);
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
      console.log(err);
    }
  };

// Post Assessment
exports.PostAssessment= async (req, res) => {
    console.log("req body");
    const reqData = req.body;
    try {
      const Assessment = new assessment({
        type: reqData.type,
        lang: {
          english: reqData.english,
          tamil: reqData.tamil,
        },
        title:reqData.title,
        thumnail:reqData.thumnail,
        category:reqData.category,
        lang_type: reqData.lang_type,
        std:reqData.std,
        questions:reqData.questions,
        no_of_chapters:reqData.no_of_chapters,
        status:reqData.status,
        status_percentage:reqData.status_percentage,
        duration:reqData.duration,
        size:reqData.size,
        created_by:reqData.created_by,
        reviewed_by:reqData.reviewed_by,
        approved_by:reqData.approved_by
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
    res.status(200).json(assessmentFound);
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
};