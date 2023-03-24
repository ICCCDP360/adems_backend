const Assessment = require("../../modals/Student tasks/Assessment");
const concept = require("../../modals/Student tasks/Concept");
const Pdf = require("../../modals/Student tasks/Pdf");
const Practice = require("../../modals/Student tasks/Practice");
const Video = require("../../modals/Student tasks/Video");
var date = new Date();

//Get Concept
exports.GetConcept = async (req, res) => {
  try {
    // get all data
    concept
      .find({ lang_type: req.query.lang || "english" })
      .exec(function (err, users) {
        if (users) {
          return res.status(200).json(users);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

//Post Concept
exports.PostConcept = async (req, res) => {
  const reqData = req.body;
  try {
    const Concept = new concept({
      name: reqData.name,
      std: reqData.std,
      assessment: reqData.assessment,
      pdf: reqData.pdf,
      practice: reqData.practice,
      video: reqData.video,
      category: reqData.category,
      assessment_count: reqData.assessment_count,
      practice_count: reqData.practice_count,
      video_count: reqData.video_count,
      status: reqData.status,
      assign_to: reqData.assign_to,
      myconcept_id: reqData.myconcept_id,
      completed_status: reqData.completed_status,
      completed_percentage: reqData.completed_percentage,
      lang_type: reqData.lang_type,
    });
    const savePostConcept = await Concept.save();
    res.status(200).json(savePostConcept);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Getbyid Concept
exports.GetbyidConcept = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.query.id);
    return res.status(200).json(conceptFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptPdf = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Pdf Not found" });
    if (conceptFound.pdf) {
      const pdfDetailsFound = await Pdf.find(
        {
          _id: { $in: conceptFound.pdf },
          lang_type: req.query.lang || "english",
        },
        { _id: 1, url: 2, thumnail: 3, title: 4 }
      );
      if (!pdfDetailsFound) {
        return res.status(404).json({ message: "Pdf Not found" });
      }
      let pdfSet = [];
      for (let k = 0; k < pdfDetailsFound.length; k++) {
        let data = {
          pdfUrl: pdfDetailsFound[k].url,
          pdfThumnail: pdfDetailsFound[k].thumnail,
          pdfTitle: pdfDetailsFound[k].title,
          pdfId: pdfDetailsFound[k]._id,
        };
        pdfSet.push(data);
      }
      return res.status(200).json(pdfSet);
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptAssessment = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Concept Not found" });
    if (conceptFound.assessment) {
      const assessmentDetailsFound = await Assessment.find(
        {
          _id: { $in: conceptFound.assessment },
          lang_type: req.query.lang || "english",
        },
        { _id: 0, questions: 1, title: 2, thumnail: 3 }
      );
      if (!assessmentDetailsFound)
        return res.status(404).json({ message: "Assessment Not Found" });
      let assessmentSet = [];
      let dataSet = [];
      for (let k = 0; k < assessmentDetailsFound.length; k++) {
        let dataSet = [];
        for (
          let index = 0;
          index < assessmentDetailsFound[k].questions.length;
          index++
        ) {
          let element = assessmentDetailsFound[k].questions[index];
          let answeroptiondata = element.options;
          var assessmentoptions = [];
          for (let l = 0; l < 4; l++) {
            let datas = {
              _id: answeroptiondata[l]._id,
              id: answeroptiondata[l].id,
              label: answeroptiondata[l].label,
              answer: l == element.answer ? true : false,
            };
            assessmentoptions.push(datas);
          }
          let data1 = {
            id: element.id,
            number: index + 1,
            question: element.question,
            answeroption: assessmentoptions,
            image: element.image,
          };
          dataSet.push(data1);
        }
        let data = {
          assessmentThumnail: assessmentDetailsFound[k].thumnail,
          assessmentTitle: assessmentDetailsFound[k].title,
          assessmentQuestions: dataSet, //assessmentDetailsFound[k].questions
        };
        assessmentSet.push(data);
      }
      return res.status(200).json(assessmentSet);

      // return res.status(200).json({"questions":dataSet,"title": assessmentDetailsFound.title,
      // "thumnail": assessmentDetailsFound.thumnail});
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptVideo = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Video Not found" });
    if (conceptFound.video) {
      const videoDetailsFound = await Video.find(
        {
          _id: { $in: conceptFound.video },
          lang_type: req.query.lang || "english",
        },
        { _id: 1, url: 2, thumnail: 3, title: 4, completed_percentage: 5 }
      );
      let videoSet = [];
      for (let k = 0; k < videoDetailsFound.length; k++) {
        let data = {
          videoUrl: videoDetailsFound[k].url,
          videoThumnail: videoDetailsFound[k].thumnail,
          videoTitle: videoDetailsFound[k].title,
          videoId: videoDetailsFound[k]._id,
          videoCompletedPercentage: videoDetailsFound[k].completed_percentage,
        };
        videoSet.push(data);
      }
      if (!videoDetailsFound) {
        return res.status(404).json({ message: "Video Not found" });
      }
      return res.status(200).json({ videos: videoSet });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptPractice = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Practice Not found" });
    if (conceptFound.practice != "") {
      const practiceDetailsFound = await Practice.find(
        {
          _id: { $in: conceptFound.practice },
          lang_type: req.query.lang || "english",
        },
        { _id: 0, questions: 1, title: 2, thumnail: 3 }
      );
      let practiceSet = [];
      // return res.status(200).json(practiceDetailsFound);
      for (let y = 0; y < practiceDetailsFound.length; y++) {
        let dataSet = [];
        for (
          let index = 0;
          index < practiceDetailsFound[y].questions.length;
          index++
        ) {
          let element = practiceDetailsFound[y].questions[index];
          let answeroptiondata = element.options;
          var assessmentoptions = [];
          for (let l = 0; l < 4; l++) {
            let datas = {
              _id: answeroptiondata[l]._id,
              id: answeroptiondata[l].id,
              label: answeroptiondata[l].label,
              answer: l == element.answer ? true : false,
            };
            assessmentoptions.push(datas);
          }
          let data1 = {
            id: element.id,
            number: index + 1,
            question: element.question,
            answeroption: assessmentoptions,
            image: element.image,
            Explanation: element.explanation,
            hint: element.hint,
          };
          dataSet.push(data1);
        }
        let data = {
          practiceThumnail: practiceDetailsFound[y].thumnail,
          practiceTitle: practiceDetailsFound[y].title,
          practiceQuestions: dataSet, //assessmentDetailsFound[k].questions
        };
        practiceSet.push(data);
      }

      return res.status(200).json(practiceSet);
    }
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Get Concept by sch_id
exports.GetConceptBySchId = async (req, res) => {
  try {
    let school_ids = [req.query.sch_id];
    let student_std = req.query.std;
    let standard_datas = [
      { 6: "VI" },
      { 7: "VII" },
      { 8: "VIII" },
      { 9: "XI" },
      { 10: "X" },
      { 11: "XI" },
      { 12: "XII" },
    ];
    let filteredStd;
    for (let j = 0; j < standard_datas.length; j++) {
      if (standard_datas[j][student_std] != undefined) {
        filteredStd = standard_datas[j][student_std];
      }
    }
    concept
      .find({
        lang_type: req.query.lang || "english",
        assign_to: { $in: school_ids },
        std: filteredStd || "XI",
      })
      .exec(function (err, users) {
        if (users) {
          return res.status(200).json(users);
        } else if (err) {
          return res.status(400).send("no data found : ", err);
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

//Get ConceptPagination
exports.GetConceptpagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10, lang = "english" } = req.query;

  try {
    // execute query with page and limit values
    const conceptpagination = await concept
      .find({ lang_type: lang })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await concept.find({ lang_type: lang }).count();//await concept.countDocuments();

    // return response with posts, total pages, and current page
    return res.json({
      conceptpagination,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Get ConceptPaginationbySchoolid
exports.GetConceptSchoolPagination = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  try {
    let school_ids = [req.query.sch_id];
    const conceptpaginationbyschoolid = concept
      .find({
        lang_type: req.query.lang || "english",
        assign_to: { $in: school_ids }
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await concept.find({ lang_type: lang, assign_to: { $in: school_ids }}).count();//await concept.countDocuments();

    // return response with posts, total pages, and current page
    return res.json({
      conceptpaginationbyschoolid,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};