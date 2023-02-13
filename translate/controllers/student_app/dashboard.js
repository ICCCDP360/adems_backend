const Dashboard = require("../../modals/student_app/Dashboard");
var date = new Date();

//Get dashboard
exports.GetDashboard = async (req, res) => {
  console.log(req.query.lang);
  const lang = req.query.lang;
  try {
    // get all data
    Dashboard.find().exec(function (err, users) {
      if (users) {
        console.log("---------------", users[0].task_rem[lang]);
        const data = {
          task_rem: users[0].task_rem[lang],
          notic_board: users[0].notic_board[lang],
          standing: users[0].standing[lang],
          performance_score: users[0].performance_score[lang],
          topics_completed: users[0].topics_completed[lang],
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
  try {
    console.log("req body", reqData);
    const value = await Dashboard.find();
    console.log(value.length);
    if (value.length >= 1) return res.status(400).send("data found : ");
    const publisher = new Dashboard(req.body);
    await publisher.save();
    // const postDashbord = Dashboard.create(reqData);
    // console.log(postDashbord);
    // const PostDashboard = new Dashboard({
    //   // task_rem: [
    //   //   {
    //   //     english: {
    //   //       title: reqData["english"].title,
    //   //       subject: reqData["english"].subject,
    //   //       total: reqData["english"].total,
    //   //     },
    //   //     tamil: {
    //   //       title: reqData["tamil"].title,
    //   //       subject: reqData["tamil"].subject,
    //   //       total: reqData["tamil"].total,
    //   //     },
    //   //   },
    //   // ],
    //   // notic_board: [
    //   //   {
    //   //     english: {
    //   //       title: reqData.title,
    //   //       contenet: reqData.contenet,
    //   //       total: reqData.total,
    //   //     },
    //   //     tamil: {
    //   //       title: reqData.title,
    //   //       contenet: reqData.contenet,
    //   //       total: reqData.total,
    //   //     },
    //   //   },
    //   // ],
    //   // standing: [
    //   //   {
    //   //     english: {
    //   //       standing: reqData.standing,
    //   //       avergescore: reqData.avergescore,
    //   //       totaltimespent: reqData.totaltimespent,
    //   //     },
    //   //     tamil: {
    //   //       standing: reqData.standing,
    //   //       avergescore: reqData.avergescore,
    //   //       totaltimespent: reqData.totaltimespent,
    //   //     },
    //   //   },
    //   // ],
    //   // performance_score: [
    //   //   {
    //   //     english: {
    //   //       title: reqData.title,
    //   //       maths: reqData.maths,
    //   //       science: reqData.science,
    //   //     },
    //   //     tamil: {
    //   //       title: reqData.title,
    //   //       maths: reqData.maths,
    //   //       science: reqData.science,
    //   //     },
    //   //   },
    //   // ],
    //   // topics_completed: [
    //   //   {
    //   //     english: {
    //   //       title: reqData.title,
    //   //       topics: reqData.topics,
    //   //     },
    //   //     tamil: {
    //   //       title: reqData.title,
    //   //       topics: reqData.topics,
    //   //     },
    //   //   },
    //   // ],
    // });
    // const savePostDashboard = await PostDashboard.save();
    res.status(200).json(publisher);
  } catch (err) {
    console.log(err);
  }
};
