const accountHolder = require("../../modals/Student/AccountHolder");
let date = new Date();

// Post  A/c holder
exports.PostAccountHolder = async (req, res) => {
  const reqData = req.body;
  try {
    const PostAccountHolder = new accountHolder({
      type: reqData.type,
      lang: {
        english: reqData.english,
        tamil: reqData.tamil,
      },
      ph_code: reqData.ph_code,
      phone: reqData.phone,
      name: reqData.name,
      relation: reqData.relation,
      email: reqData.email,
      address: reqData.address,
      city: reqData.city,
      state: reqData.state,
      stu_id: reqData.stu_id,
      lang_type: reqData.lang_type,
      verify: false,
    });
    const savePostAccountHolder = await PostAccountHolder.save();
    return res.status(200).json(savePostAccountHolder);
  } catch (err) {
    return res.status(404).json(err);
  }
};

//Getbyid A/c holder
exports.GetbyidAccountHolder = async (req, res) => {
  try {
    const accountHolderFound = await accountHolder.findById(req.params.id);
    return res.status(200).json(accountHolderFound);
  } catch (err) {
    return res.status(404).json(err);
  }
};
