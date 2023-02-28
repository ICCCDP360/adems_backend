const video = require("../../modals/Student tasks/Video");
var date = new Date();

//Get Videos
exports.GetVideo = async (req, res) => {
  console.log(req.query.lang);
  let lang = req.query.lang;
  try {
    // get all data
    video.find().exec(function (err, users) {
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
exports.PostVideo = async (req, res) => {
    console.log("req body");
    const reqData = req.body;
    try {
      const Video = new video({
        type: reqData.type,
        lang: {
          english: reqData.english,
          tamil: reqData.tamil,
        },
        title:reqData.title,
        thumnail:reqData.thumnail,
        catageroy:reqData.catageroy,
        url:reqData.url,
        token:reqData.token,
        key:reqData.key,
        assign_to:reqData.assign_to,
        duration:reqData.duration,
        relation:reqData.relation,
        size:reqData.size,
        reviewed_by:reqData.reviewed_by,
        approved_by:reqData.approved_by
      });
      const savePostVideo = await Video.save();
      res.status(200).json(savePostVideo);
    } catch (err) {
      if (err.message.split(" ")[0] == "A1000") {
        return res.status(400).json({ message: "already exist" });
      } else {
        return res.status(400).json({ message: err.message });
      }
    }
  };

  // Getbyid Videos

  exports.GetbyidVideo = async (req, res) => {
  try {
    const videoFound = await videoFound.findById(req.query.id);
    res.status(200).json(videoFound);
  } catch (err) {
    console.log(err);
  }
};