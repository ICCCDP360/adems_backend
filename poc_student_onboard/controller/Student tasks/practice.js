const practice = require("../../modals/Student tasks/Practice")
var date = new Date()

//Get Videos
exports.GetPractice = async (req, res) => {
    console.log(req.query.lang);
    let lang = req.query.lang;
    try {
      // get all data
      practice.find().exec(function (err, users) {
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
exports.PostPractice = async (req, res) => {
    console.log("req body");
    const reqData = req.body;
    try {
      const Practice = new practice({
        type: reqData.type,
        lang: {
          english: reqData.english,
          tamil: reqData.tamil,
        },
        title:reqData.title,
        thumnail:reqData.thumnail,
        catageory:reqData.catageory,
        std:reqData.std,
        questions:reqData.questions,
        noOfchapters:reqData.noOfchapters,
        status:reqData.status,
        status_percentage:reqData.status_percentage,
        task_id:reqData.task_id,
        assign_to:reqData.assign_to,
        duration:reqData.duration,
        size:reqData.size,
        created_by:reqData.created_by,
        reviewed_by:reqData.reviewed_by,
        approved_by:reqData.approved_by
      });
      const savePostPractice = await Practice.save();
      res.status(200).json(savePostPractice);
    } catch (err) {
      if (err.message.split(" ")[0] == "A1000") {
        return res.status(400).json({ message: "already exist" });
      } else {
        return res.status(400).json({ message: err.message });
      }
    }
  };

  // Getbyid practices

  exports.GetbyidPractice = async(req,res)=> {
    try{
      const practiceFound = await practice.findById(req.query.id)
      res.status(200).json(practiceFound)
    }catch(err){
      console.log(err);
    }
  }