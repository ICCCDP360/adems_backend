const TeacherDetails = require("../modals/Teacherdetails");
let date = new Date();

//Get Teacherdetails
exports.getDetails = async (req, res) => {
  let lang = req.query.lang;
  try {
    // get all data
    TeacherDetails.find().exec(function (err, users) {
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
        return res.status(200).json(users);
      } else if (err) {
        return res.status(400).send("no data found : ", err);
      }
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Post teacherdetails
exports.createDetails = async (req, res) => {
  const reqData = req.body;
  try {
    const PostTeacherDetails = new TeacherDetails({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
      teacher_id: reqData.teacher_id,
      sch_id:reqData.sch_id,
      name: reqData.name,
      phone: reqData.phone,
      classes: reqData.classes,
      subjects: reqData.subjects,
      lang_type:reqData.lang_type
    });
    const savePostTeacherDetails = await PostTeacherDetails.save();
    return res.status(200).json(savePostTeacherDetails);
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Put or Update teacherdetails
exports.updateDetails = async (req, res) => {
  const reqData = req.body;
  const id = req.params.id;

  try {
    // get user by name
    const teacherDetailsFound = await TeacherDetails.findOneAndUpdate(
      { _id: id },
      reqData,
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );
    if (!teacherDetailsFound) return res.status(400).send("no profile found");
    return res.status(200).json(teacherDetailsFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};
//Delete Teacherdetails
exports.deleteDetails = async (req, res) => {
  try {
    const deleteFound = await TeacherDetails.findOneAndDelete(req.params.id);
    return res.status(200).json("database deleted success");
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Getbyid teacherdetails
exports.getByIdDetails = async (req, res) => {
  try {
    const teacherDetailsFound = await TeacherDetails.findById(req.params.id);
    res.status(200).json(teacherDetailsFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Getbyid TeacherPagination
exports.GetbyidDetailsPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10} = req.query;

  try {
    const detailspagination = TeacherDetails
      .find({lang_type: req.query.lang || "english"})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await TeacherDetails.find({lang_type: req.query.lang || "english"}).count();

    // return response with posts, total pages, and current page
    return res.json({
      detailspagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Get TeacherPagination
exports.GetDetailsPagination = async(req,res) =>{

  // destructure page and limit and set default values
  const { page = 1, limit = 10} = req.query;
  
  try {
    // execute query with page and limit values
    const detailspagination = await TeacherDetails
      .find({lang_type: req.query.lang || "english"})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
  
    // get total documents in the Posts collection 
    const count = await TeacherDetails.find({lang_type: req.query.lang || "english"}).countDocuments();
  
    // return response with posts, total pages, and current page
    return res.json({
      detailspagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    return res.status(404).json(err);
  }
  };
