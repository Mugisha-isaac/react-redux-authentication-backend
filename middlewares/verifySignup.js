const db = require('../model');
const Roles = db.ROLES;
const User = db.user;


checkDuplicateUsernameorEmail = (req,res,next)=>{
   User.findOne({
       where:{
           username:req.body.username
       }
   }).then(user=>{
       if(user){
           res.status(400).send({message:"user already exists"});
           return;
       }
       User.findOne({
           where: {email:req.body.email}
       }).then(user=>{
           if(user){
               res.status(400).send({message:'email already exists'});
               return;
           }
          next();
       })
   })
};

checkRolesExisted = (req,res,next) =>{
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length;i++){
            if(!Roles.includes(req.body.roles[i])){
                res.status(400).send({message:'role does not exist'});
                return;
            }
        }
    }
    next();
}

const verifySignup = {
    checkDuplicateUsernameorEmail: checkDuplicateUsernameorEmail,
    checkRolesExisted: checkRolesExisted
};


module.exports = verifySignup;