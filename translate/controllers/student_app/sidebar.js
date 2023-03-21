const Sidebar = require("../../modals/student_app/Sidebar");
var date = new Date();

//Get Sidebar
exports.GetSidebar = async (req, res) => {
  let lang = req.query.lang;
  try {
    // get all data
    Sidebar.find().exec(function (err, users) {
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

// Post Sidebar
exports.PostSidebar = async (req, res) => {
  const reqData = req.body;
  try {
    const TaskRemSidebar = new Sidebar({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
    });
    const savePostSidebar = await TaskRemSidebar.save();
    res.status(200).json(savePostSidebar);
  } catch (err) {
    if (err.message.split(" ")[0] == "E11000") {
      return res.status(400).json({ message: "type key is already exist" });
    } else {
      return res.status(400).json({ message: err.message });
    }
  }
};
