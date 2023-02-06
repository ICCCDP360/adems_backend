const sch_principal = require("../module/Sch_principal");
var date = new Date();

//Get Sch_principal
exports.GetSch_principal = async(req, res) => {
    console.log(req.query.name) 
     try{
       // get all data
       sch_principal.find().exec(function(err, users){
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
     
 // Post Sch_principal
 exports.PostSch_principal= async(req,res) => {
    const reqData = req.body;
    console.log("req body",reqData);
    try{

        const PostSch_principal= new sch_principal(
            {
                sch_id:reqData.sch_id,
                sch_name:reqData.sch_name,
                address:reqData.address,
                city:reqData.city,
                teacher:reqData.teacher,
                student:reqData.student,
                user_name:reqData.user_name,
                pwd:reqData.pwd,
                goadem_admin:reqData.goadem_admin
            }
        )
        const savePostSch_principal=await PostSch_principal.save()
        res.status(200).json(savePostSch_principal);
    }
    catch(err){
        console.log(err);
    }
};
 
   //Getbyid Sch_principal
  exports.GetbyidSch_principal = async(req,res) => {
    try{
      const sch_principalFound = await sch_principal.findById(req.params.id);
       res.status(200).json(sch_principalFound);
      }
       catch(err){
       console.log(err);
    }
  };
  
 