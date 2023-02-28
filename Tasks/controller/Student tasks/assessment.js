const assessment = require("../../modals/Student tasks/Assessment")
var date = new Date()

//Get Videos
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

// Post Videos
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
        que_id:reqData.vid_id,
        que_title:reqData.vid_title,
        thumnail_url:reqData.thumnail_url,
        que_cat:reqData.vide_cat,
        questions:reqData.video_url,
        assign_to:reqData.assign_to,
        duration:reqData.duration,
        size:reqData.size,
        created_by:reqData.created_by,
        reviewed_by:reqData.reviewed_by,
        approved_by:reqData.approved_by
      });
      const savePostAssessment = await assessment.save();
      res.status(200).json(savePostAssessment);
    } catch (err) {
      if (err.message.split(" ")[0] == "A1000") {
        return res.status(400).json({ message: "already exist" });
      } else {
        return res.status(400).json({ message: err.message });
      }
    }
  };

  // Getbyid practices

  exports.GetbyidAssessment = async (req, res) => {
  try {
    const assessmentFound = await assessmentFound.findById(req.query.id);
    res.status(200).json(assessmentFound);
  } catch (err) {
    console.log(err);
  }
};