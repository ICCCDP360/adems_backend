const Course = require("../../modals/student_app/Course");
var date = new Date();

//Get Course
exports.GetCourse = async (req, res) => {
  console.log(req.query.lang);
  let lang = req.query.lang;
  try {
    // get all data
    Course.find().exec(function (err, users) {
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

// Post Course
exports.PostCourse = async (req, res) => {
  console.log("req body");
  const reqData = req.body;
  try {
    const TaskRemCourse = new Course({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
    });
    const savePostCourse = await TaskRemCourse.save();
    res.status(200).json(savePostCourse);
  } catch (err) {
    if (err.message.split(" ")[0] == "E11000") {
      return res.status(400).json({ message: "type key is already exist" });
    } else {
      return res.status(400).json({ message: err.message });
    }
  }
};
