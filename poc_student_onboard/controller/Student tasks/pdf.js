const pdf = require("../../modals/Student tasks/Pdf");
var date = new Date();

//Get Pdf
exports.GetPdf = async (req, res) => {
  console.log(req.query.lang);
  let lang = req.query.lang;
  try {
    // get all data
    pdf.find().exec(function (err, users) {
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

// Post Pdf
exports.PostPdf = async (req, res) => {
    console.log("req body");
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
    const pdfFound = await pdfFound.findById(req.query.id);
    res.status(200).json(pdfFound);
  } catch (err) {
    console.log(err);
  }
};