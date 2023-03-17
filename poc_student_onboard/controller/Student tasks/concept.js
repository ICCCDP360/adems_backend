const concept = require("../../modals/Student tasks/Concept");
var date = new Date();

//Get Concept
exports.GetConcept = async (req, res) => {
  console.log(req.query.name);
  try {
    // get all data
    concept.find().exec(function (err, users) {
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

// Getbyid Concept
exports.GetbyidConcept = async(req,res)=>{
    try {
        const conceptFound = await concept.findById(req.query.id);
        res.status(200).json(conceptFound);
      } catch (err) {
        console.log(err);
        res.status(404).json(err)
      }
};