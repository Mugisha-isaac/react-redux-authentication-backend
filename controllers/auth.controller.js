const db = require('../model');
const config = require('../config/auth.confi');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');


exports.signup = async(req, res) => {
    // Save User to Database
   await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };


module.exports.signin = async(req,res)=>{
    User.findOne({
        where: {username:req.body.username}
    }).then(user =>{
        console.log(user);
         if(!user) return res.status(404).send({message:'invalid credentials'});
         var passIsValid =  bcrypt.compareSync(req.body.password, user.password);
         console.log("password consoled .........",passIsValid);
         if(!passIsValid) return res.status(401).send({token:null, message:'invalid credentials'});
         var token = jwt.sign({id:user.id}, config.secret,{
             expiresIn:86400
         });
         var authorities = [];
         user.getRoles().then(roles =>{
             for(let i=0; i<roles.length;i++){
                 authorities.push("Role", roles[i].name.toUpperCase());
             }
             res.status(200).send({
                 id:user.id,
                 username:user.username,
                 email:user.email,
                 roles:authorities,
                 accessToken: token
             })
         })
    }).catch(err =>{
        res.status(500).send({message:err.message});
    })
}