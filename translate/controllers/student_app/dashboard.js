const dashboard = require("../../modals/student_app/Dashboard");
var date = new Date();

//Get dashboard
exports.GetDashboard = async (req, res) => {
  console.log(req.query.lang);
  const lang = req.query.lang;
  try {
    // get all data
    dashboard.find().exec(function (err, users) {
      if (users) {
        const data = {
          task_rem: users[0][lang],
          notic_board: users[1][lang],
          standing: users[2][lang],
          performance_score: users[3][lang],
          topics_completed: users[4][lang],
          u_dt: users.u_dt,
          dt: users.dt,
        };
        return res.status(200).json(data);
      } else if (err) {
        return res.status(400).send("no data found : ", err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Post dashboard
exports.PostDashboard = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const PostDashboard = new dashboard(
      {
        task_rem: [
          {
            english: {
              title: reqData.title,
              subject: reqData.subject,
              total: reqData.total,
            },
          },
          {
            tamil: {
              title: reqData.title,
              subject: reqData.subject,
              total: reqData.total,
            },
          },
        ],
      },
      {
        notic_board: [
          {
            english: {
              title: reqData.title,
              contenet: reqData.contenet,
              total: reqData.total,
            },
          },
          {
            tamil: {
              title: reqData.title,
              contenet: reqData.contenet,
              total: reqData.total,
            },
          },
        ],
      },
      {
        standing: [
          {
            english: {
              standing: reqData.standing,
              avergescore: reqData.avergescore,
              totaltimespent: reqData.totaltimespent,
            },
          },
          {
            tamil: {
              standing: reqData.standing,
              avergescore: reqData.avergescore,
              totaltimespent: reqData.totaltimespent,
            },
          },
        ],
      },
      {
        performance_score: [
          {
            english: {
              title: reqData.title,
              maths: reqData.maths,
              science: reqData.science,
            },
          },
          {
            tamil: {
              title: reqData.title,
              maths: reqData.maths,
              science: reqData.science,
            },
          },
        ],
      },
      {
        topics_completed: [
          {
            english: {
              title: reqData.title,
              topics: reqData.topics,
            },
          },
          {
            tamil: {
              title: reqData.title,
              topics: reqData.topics,
            },
          },
        ],
      }
    );
    const savePostDashboard = await PostDashboard.save();
    res.status(200).json(savePostDashboard);
  } catch (err) {
    console.log(err);
  }
};
