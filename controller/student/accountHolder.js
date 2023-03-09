const accountHolder = require("../../modals/Student/AccountHolder");
var date = new Date();

// Post Stu_ac_holder
exports.PostAccountHolder = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const PostAccountHolder = new accountHolder({
      ph_code: reqData.ph_code,
      phone: reqData.phone,
      name: reqData.name,
      relation: reqData.relation,
      email: reqData.email,
      stu_id: reqData.stu_id,
      verify: false,
    });
    const savePostAccountHolder = await PostAccountHolder.save();
    res.status(200).json(savePostAccountHolder);
  } catch (err) {
    console.log(err);
  }
};

//Getbyid Stu_ac_holder
exports.GetbyidAccountHolder = async (req, res) => {
  try {
    const accountHolderFound = await accountHolder.findById(req.params.id);
    res.status(200).json(accountHolderFound);
  } catch (err) {
    console.log(err);
  }
};
