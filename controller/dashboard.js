const dashboard = require("../modals/Dashboard");
var date = new Date();

//Get dashboard
exports.GetDashboard = async(req, res) => {
    console.log(req.query.name) 
     try{
       // get all data
       dashboard.find().exec(function(err, users){
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
     
 // Post dashboard
 exports.PostDashboard= async(req,res) => {
    const reqData = req.body;
    console.log("req body",reqData);
    try{

        const PostDashboard= new dashboard(
            {
                "task-rem":[
                    {
                    "english":{
                      title:reqData.title,
                      subject:reqData.subject,
                      total:reqData.total 
                    }
                },
                {
                    "tamil":{
                        title:reqData.title,
                        subject:reqData.subject,
                        total:reqData.total  
                    }
                }    
                ]
            },
            {
                "notic-board":[
                    {
                    "english":{
                      title:reqData.title,
                      contenet:reqData.contenet,
                      total:reqData.total 
                    }
                },
                {
                    "tamil":{
                        title:reqData.title,
                        contenet:reqData.contenet,
                        total:reqData.total 
                    }
                }    
                ]
            },
            {
                "standing":[
                    {
                    "english":{
                      standing:reqData.standing,
                      avergescore:reqData.avergescore,
                      totaltimespent:reqData.totaltimespent
                    }
                },
                {
                    "tamil":{
                        standing:reqData.standing,
                        avergescore:reqData.avergescore,
                        totaltimespent:reqData.totaltimespent 
                    }
                }    
                ]
            },
            {
                "performance_score":[
                    {
                    "english":{
                      title:reqData.title,
                      maths:reqData.maths,
                      science:reqData.science
                    }
                },
                {
                    "tamil":{
                        title:reqData.title,
                        maths:reqData.maths,
                        science:reqData.science 
                    }
                }    
                ]
            },
            {
                "topics_completed":[
                    {
                    "english":{
                      title:reqData.title,
                      topics:reqData.topics
                    }
                },
                {
                    "tamil":{
                        title:reqData.title,
                        topics:reqData.topics 
                    }
                }    
                ]
            },
        )
        const savePostDashboard=await PostDashboard.save()
        res.status(200).json(savePostDashboard);
    }
    catch(err){
        console.log(err);
    }
};
 