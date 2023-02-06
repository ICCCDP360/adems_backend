const stu_details = require("../module/Stu_details");
var date = new Date();

//Get Studentdetails
exports.GetStu_details = async(req, res) => {
    console.log(req.query.name) 
     try{
       // get all data
       stu_details.find().exec(function(err, users){
         if(users){
           return res.status(200).json(users)
         }else if(err){
           return res.status(400).send("no data found : ", err);
         }
        }); 
     }
     catch(err){
       console.log(err);
     }
   };
     
 // Post Studentdetails
 exports.PostStu_details= async(req,res) => {
    const reqData = req.body;
    console.log("req body",reqData);
    try{

        const PostStu_details = new stu_details(
            {
                stu_id:reqData.stu_id,
                stu_name:reqData.stu_name, 
                email:reqData.email, 
                contact:reqData.contact,
                dob:reqData.dob, 
                gender:reqData.gender, 
                city:reqData.city, 
                sch_id:reqData.sch_id, 
                p_g_name:reqData.p_g_name, 
                relation:reqData.relation, 
                p_g_email:reqData.p_g_email, 
                p_g_contact:reqData.p_g_contact, 
                pwd:reqData.pwd,
                assign_teacher:reqData.assign_teacher,
            }
        )
        const savePostStu_details=await PostStu_details.save()
        res.status(200).json(savePostStu_details);
    }
    catch(err){
        console.log(err);
    }
};
 
//Put or Update Studentdetails
exports.PutStu_details = async (req, res) => {
    const reqData = req.body;
    const id=req.params.id;
    console.log("req body",id);
    //console.log("print data from frontend", id)

    try{
      // get user by name
     const stu_detailsFound = await stu_details.findOneAndUpdate({_id:id},reqData, {
        new:true,
        upsert:true,
        rawResult:true,
     });
      console.log(stu_detailsFound);
      if(!stu_detailsFound) return res.status(400).send("no data found");
      console.log("kl",stu_detailsFound);
     return res.status(200).json(stu_detailsFound);
    }
    catch(err){
      console.log(err);
    }
  };
  
  //Getbyid Studentdetails
  exports.GetbyidStu_details = async(req,res) => {
    try{
      const stu_detailsFound = await stu_details.findById(req.params.id);
       res.status(200).json(stu_detailsFound);
      }
       catch(err){
       console.log(err);
    }
  };
  
 