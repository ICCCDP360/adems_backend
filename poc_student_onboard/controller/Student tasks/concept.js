const Assessment = require("../../modals/Student tasks/Assessment");
const concept = require("../../modals/Student tasks/Concept");
const Pdf = require("../../modals/Student tasks/Pdf");
const Practice = require("../../modals/Student tasks/Practice");
const Video = require("../../modals/Student tasks/Video");
var date = new Date();

//Get Concept
exports.GetConcept = async (req, res) => {
  console.log(req.query.name);
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
    res.status(404).json(err);
  }
};

//Post Concept
exports.PostConcept = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
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
      lang_type: reqData.lang_type,
    });
    const savePostConcept = await Concept.save();
    res.status(200).json(savePostConcept);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Getbyid Concept
exports.GetbyidConcept = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.query.id);
    return res.status(200).json(conceptFound);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptPdf = async (req, res) => {
  console.log(req.params.id);
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Pdf Not found" });
    if (conceptFound.pdf) {
      const pdfDetailsFound = await Pdf.findOne(
        { _id: conceptFound.pdf },
        { _id: 0, url: 1, thumnail: 2 }
      );
      return res
        .status(200)
        .json({
          pdfUrl: pdfDetailsFound.url,
          pdfThumnail: pdfDetailsFound.thumnail,
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptAssessment = async (req, res) => {
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Concept Not found" });
    if (conceptFound.assessment) {
      const assessmentDetailsFound = await Assessment.findOne(
        { _id: { $in: conceptFound.assessment } },
        { _id: 0, questions: 1 }
      );
      if (!assessmentDetailsFound)
        return res.status(404).json({ message: "Assessment Not Found" });
      let dataSet = [];
      for (
        let index = 0;
        index < assessmentDetailsFound.questions.length;
        index++
      ) {
        let element = assessmentDetailsFound.questions[index];
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
        let data = {
          id: element.id,
          number: index + 1,
          question: element.question,
          answeroption: assessmentoptions,
          image: element.image,
        };
        dataSet.push(data);
      }

      return res.status(200).json(dataSet);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptVideo = async (req, res) => {
  console.log(req.params.id);
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Video Not found" });
    if (conceptFound.video) {
      const videoDetailsFound = await Video.findOne(
        { _id: { $in: conceptFound.video } },
        { _id: 0, url: 1, thumnail: 2 }
      );
      return res
        .status(200)
        .json({
          videoUrl: videoDetailsFound.url,
          videoThumnail: videoDetailsFound.thumnail,
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.GetbyidConceptPractice = async (req, res) => {
  console.log(req.params.id);
  try {
    const conceptFound = await concept.findById(req.params.id);
    if (!conceptFound)
      return res.status(404).json({ message: "Practice Not found" });
    if (conceptFound.pdf) {
      const practiceDetailsFound = await Practice.findOne(
        { _id: { $in: conceptFound.practice } },
        { _id: 0, questions: 1 }
      );
      let dataSet = [];
      // console.log(practiceDetailsFound);
      for (let index = 0; index < practiceDetailsFound.questions.length; index++) {
          let element = practiceDetailsFound.questions[index];
          let answeroptiondata = element.options;
          var assessmentoptions = [];
          for(let l=0;l<4;l++){
            let datas ={
              _id: answeroptiondata[l]._id,
              id: answeroptiondata[l].id,
              label: answeroptiondata[l].label,
              answer: l == element.answer ? true : false
            }
            assessmentoptions.push(datas);
          }
          let data = {
            id: element.id,
            number: index + 1,
            question: element.question,
            answeroption: assessmentoptions,
            image: element.image,
            Explanation: element.explanation,
            hint: element.hint
          };
          dataSet.push(data);
        }

      return res.status(200).json(dataSet);

    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};
