const StudentAccount = require("../modals/Student/AccountHolder");
const StudentDetials = require("../modals/Student/Details");
var date = new Date();

// CheckAccount
exports.CheckAccount = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  try {
    const AccountFound = await StudentAccount.findOne({
      ph_num: reqData.ph_num,
    }).select("_id holder ph_num stu_id");
    if (!AccountFound) {
      return res.status(400).json({ message: "account not found" });
    } else {
      var data = [];
      for (let index = 0; index < AccountFound.stu_id.length; index++) {
        const element = AccountFound.stu_id[index];
        const UserDetialsFound = await StudentDetials.findById(element).select(
          "_id stu_name"
        );
        data.push(UserDetialsFound);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
  // try{

  //     const PostSignin= new signin(
  //         {
  //             user_id:reqData.user_name,
  //             pwd:reqData.pwd
  //         }
  //     )
  //     const savePostSignin=await PostSignin.save()
  //     res.status(200).json(savePostSignin);
  // }
  // catch(err){
  //     console.log(err);
  // }
};

// Post Sch_principal
exports.PostSignin = async (req, res) => {
  const reqData = req.body;
  console.log("req body", reqData);
  res.status(200).json({ message: "login coming soon" });
  // try{

  //     const PostSignin= new signin(
  //         {
  //             user_id:reqData.user_name,
  //             pwd:reqData.pwd
  //         }
  //     )
  //     const savePostSignin=await PostSignin.save()
  //     res.status(200).json(savePostSignin);
  // }
  // catch(err){
  //     console.log(err);
  // }
};
