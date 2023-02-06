const teacherdetails = require("../module/Teacherdetails");
var date = new Date();

//Get Teacherdetails
exports.GetTeacherdetails = async(req, res) => {
    console.log(req.query.name) 
     try{
       // get all data
        teacherdetails.find().exec(function(err, users){
         if(users){
           return res.status(200).json(users)
         }else if(err){
           return res.status(400).send("no data found : ", err)
         }
        }); 
     }
     catch(err){
       console.log(err)
     }
   };
     
 // Post teacherdetails
 exports.PostTeacherdetails= async(req,res) => {
    const reqData = req.body
    console.log("print data fron frontend",reqData);
    try{

        const PostTeacherdetails = new teacherdetails(
            {
                teacher_id:reqData.teacher_id,
                teacher_name:reqData.teacher_name,
                phn_num:reqData.phn_num,
                classes:reqData.classes,
                subjects:reqData.subjects
            }
        )
        const savePostTeacherdetails=await PostTeacherdetails.save()
        res.status(200).json(savePostTeacherdetails);
    }
    catch(err){
        console.log(err)
    }
};
 
//Put or Update teacherdetails
exports.PutTeacherdetails = async (req, res) => {
    const reqData = req.body;
    const id=req.params.id;
    console.log("print data",id);
    //console.log("print data from frontend", id)

    try{
      // get user by name
     const teacherdetailsFound = await teacherdetails.findOneAndUpdate({_id:id},reqData, {
        new:true,
        upsert:true,
        rawResult:true,
     });
      console.log(teacherdetailsFound)
      if(!teacherdetailsFound) return res.status(400).send("no profile found");
      console.log("kl",teacherdetailsFound);
     return res.status(200).json(teacherdetailsFound);
    }
    catch(err){
      console.log(err);
    }
  };
  //Delete Teacherdetails
  exports.DeleteTeacherdetails=async(req,res) => {
    try {
        const deleteFound = await teacherdetails.findOneAndDelete(req.params.id);
        return res.status(200).json("database deleted success");
    }
    catch(err) {
        console.log(err);
    }
  };
  
  // Getbyid teacherdetails
  exports.GetbyidTeacherdetails= async(req,res) => {
    try{
      const teacherdetailsFound = await teacherdetails.findById(req.params.id);
      res.status(200).json(teacherdetailsFound);
    }
    catch(err) {
      console.log(err);
    }
  };