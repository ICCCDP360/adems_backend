const Dashboard = require("../../modals/student_app/Dashboard");
let date = new Date();

//Get dashboard
exports.GetDashboard = async (req, res) => {
  let lang = req.query.lang;
  try {
    // get all data
    Dashboard.find().exec(function (err, users) {
      if (users) {
        let dataSet = [];
        for (let index = 0; index < users.length; index++) {
          let element = users[index];
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
    return res.status(404).json(err);

  }
};

// Post dashboard
exports.PostDashboard = async (req, res) => {
  const reqData = req.body;
  try {
    const TaskRemDashboard = new Dashboard({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
    });
    const savePostDashboard = await TaskRemDashboard.save();
    res.status(200).json(savePostDashboard);
  } catch (err) {
    if (err.message.split(" ")[0] == "E11000") {
      return res.status(400).json({ message: "type key is already exist" });
    } else {
      return res.status(400).json({ message: err.message });
    }
  }
};
