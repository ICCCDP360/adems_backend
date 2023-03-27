const practice = require("../../modals/Student tasks/Practice")
var date = new Date()

//Get Videos
exports.GetPractice = async (req, res) => {
    let lang = req.query.lang;
    try {
      // get all data
      practice.find({ lang_type: req.query.lang || "english" }).exec(function (err, users) {
        if (users) {
          // console.log(users);
          var dataSet = [];
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
  
          return res.status(200).json(users);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  };

// Post Videos
exports.PostPractice = async (req, res) => {
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
        lang_type: reqData.lang_type,
        std:reqData.std,
        questions:reqData.questions,
        task_id: reqData.task_id,
        no_of_chapters:reqData.no_of_chapters,
        status:reqData.status,
        status_percentage:reqData.status_percentage,
        task_id:reqData.task_id,
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
      return res.status(200).json(practiceFound)
    }catch(err){
      return res.status(400).json(err);
    }
  }


exports.GetPracticeQuestion = async(req,res)=> {
  try{
    const practiceFound = await practice.find({_id:req.query.id})
    return res.status(200).json(practiceFound)
  }catch(err){
    return res.status(400).json(err);
  }
};

// Get PracticePagination
exports.GetPracticePagination = async(req,res) =>{
  
  // destructure page and limit and set default values
  const { page = 1, limit = 10,lang="english" } = req.query;

  try {
    // execute query with page and limit values
    const practicepagination = await practice
      .find({lang_type:lang})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await practice.find({lang_type:lang}).count()

    // return response with posts, total pages, and current page
    return res.json({
      practicepagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Getbyid PracticePagination
exports.GetbyidPracticePagination = async(req,res) =>{

// destructure page and limit and set default values
const { page = 1, limit = 10,lang="english" } = req.query;

try {
  // execute query with page and limit values
  const practicepagination = await practice
    .find({lang_type:lang})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // get total documents in the Posts collection 
  const count = await practice.find({lang_type:lang}).count();

  // return response with posts, total pages, and current page
  return res.json({
    practicepagination,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
} catch (err) {
  return res.status(400).json(err);
}
};