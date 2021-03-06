const jwt = require('jsonwebtoken');
const config = require('../config/auth.confi');
const db = require('../model');
const User = db.user;


verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token) return res.status(403).send({message:'No token provided'});
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err) return res.status(401).send({message:'Unauthorised'});
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req,res,next)=>{
   User.findByPk(req.userId).then(user=>{
       user.getRoles().then(roles=>{
           for(let i=0; i<roles.length;i++){
               if(roles[i].name ==='moderator') next(); return;
           }
           return  res.status(403).send({message:'Require Moderator role'});
       })
   })
} 

isModerator = (req,res,next)=>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
          for(let i=0; i<roles.length;i++){
              if(roles[i].name === 'moderator') next(); return;
          }
          return res.status(403).send({message:'Requires moderator role!'});            
        })
    })
}

isAdminOrModerator = (req,res,next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles =>{
            for(let i=0;i<roles.length;i++){
                if(roles[i].name === 'admin' || roles[i].name ==='moderator'){
                    next();
                    return;
                }
            }
            res.status(403).send({message:'Requires admin or moderator roles'});
        })
    })
}

const authJwt = {
    verifyToken:verifyToken,
    isModerator:isModerator,
    isAdmin: isAdmin,
    isAdminOrModerator: isAdminOrModerator
}