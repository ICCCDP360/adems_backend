// const signin = require("../modals/Signin");
var date = new Date();

 // Post Sch_principal
 exports.PostSignin= async(req,res) => {
    const reqData = req.body;
    console.log("req body",reqData);
    res.status(200).json({message:"login coming soon"});
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
 