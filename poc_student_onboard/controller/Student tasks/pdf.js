const pdf = require("../../modals/Student tasks/Pdf");
var date = new Date();

//Get Pdf
exports.GetPdf = async (req, res) => {
  let lang = req.query.lang;
  try {
    // get all data
    pdf.find({ lang_type: req.query.lang || "english" }).exec(function (err, users) {
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

        return res.status(200).json(dataSet);
      } else if (err) {
        return res.status(400).send("no data found : ", err);
      }
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

// Post Pdf
exports.PostPdf = async (req, res) => {
    const reqData = req.body;
    try {
      const Pdf = new pdf({
        type: reqData.type,
        lang: {
          english: reqData.english,
          tamil: reqData.tamil,
        },
        title:reqData.title,
        thumnail:reqData.thumnail,
        catageroy:reqData.catageroy,
        lang_type: reqData.lang_type,
        task_id: reqData.task_id,
        url:reqData.url,
        assign_to:reqData.assign_to,
        duration:reqData.duration,
        size:reqData.size,
        created_by:reqData.created_by,
        reviewed_by:reqData.reviewed_by,
        approved_by:reqData.approved_by
      });
      const savePostPdf = await Pdf.save();
      res.status(200).json(savePostPdf);
    } catch (err) {
      if (err.message.split(" ")[0] == "A1000") {
        return res.status(400).json({ message: "already exist" });
      } else {
        return res.status(400).json({ message: err.message });
      }
    }
  };

  // Getbyid Pdf

  exports.GetbyidPdf = async (req, res) => {
  try {
    const pdfFound = await pdf.findById(req.params.id);
    return res.status(200).json(pdfFound);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Get PdfPagination
exports.GetPdfPagination = async(req,res) =>{
  
  // destructure page and limit and set default values
  const { page = 1, limit = 10,lang="english" } = req.query;

  try {
    // execute query with page and limit values
    const pdfpagination = await pdf
      .find({lang_type:lang})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await pdf.find({lang_type:lang}).count()

    // return response with posts, total pages, and current page
    return res.json({
      pdfpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Getbyid PdfPagination
exports.GetbyidPdfPagination = async(req,res) =>{

// destructure page and limit and set default values
const { page = 1, limit = 10,lang="english" } = req.query;

try {
  // execute query with page and limit values
  const pdfpagination = await pdf
    .find({lang_type:lang})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // get total documents in the Posts collection 
  const count = await pdf.find({lang_type:lang}).count();

  // return response with posts, total pages, and current page
  res.json({
    pdfpagination,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
} catch (err) {
  return res.status(400).json(err);
}
};