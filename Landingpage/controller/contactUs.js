const Contactus = require("../modals/Contactus");
let date = new Date();

//Get Contactus
exports.GetContactus = async (req, res) => {
  try {
    // get all data
    Contactus.find().exec(function (err, users) {
      if (users) {
        return res.status(200).json(users);
      } else if (err) {
        return res.status(400).send("no data found : ", err);
      }
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};

//post contactus
exports.PostContactus = async (req, res) => {
  const reqData = req.body;
  try {
    const PostContactus = new Contactus({
      Name: reqData.Name,
      Your_email: reqData.Your_email,
      School_Name: reqData.School_Name,
      Contact_Number: reqData.Contact_Number,
      City: reqData.City,
      Education_board: reqData.Education_board,
      NoOfStudent_in_6to12: reqData.NoOfStudent_in_6to12,
      Your_message: reqData.Your_message,
    });
    const savePostContactus = await PostContactus.save();
    return res.status(200).json(savePostContactus);
  } catch (err) {
    return res.status(404).json(err);
  }
};
