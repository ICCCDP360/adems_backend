const stu_ac_holder = require("../modals/stu_ac_holder");
var date = new Date();

 // Post Stu_ac_holder
 exports.PostStu_ac_holder= async(req,res) => {
    const reqData = req.body
    console.log("req body",reqData);
    try{

        const PostStu_ac_holder = new stu_ac_holder(
            {
                phn_code:reqData.phn_code ,
                phn_num:reqData.phn_num,
                holder_name:reqData.holder_name,
            }
        )
        const savePostStu_ac_holder=await PostStu_ac_holder.save()
        res.status(200).json(savePostStu_ac_holder);
    }
    catch(err){
        console.log(err)
    }
};
 
  //Getbyid Stu_ac_holder
  exports.GetbyidStu_ac_holder = async(req,res) => {
    try{
      const stu_ac_holderFound = await stu_ac_holder.findById(req.params.id);
       res.status(200).json(stu_ac_holderFound);
      }
       catch(err){
       console.log(err)
    }
  };
  
 
  