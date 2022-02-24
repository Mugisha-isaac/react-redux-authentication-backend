const {verifySignUp} = require('../middlewares/verifySignup');
const controller = require('../controllers/auth.controller');

module.export = function(app){
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");
        next();
    })
    app.post('api/auth/signup',[verifySignUp.checkDuplicateUsernameorEmail,verifySignUp.checkRolesExisted], controller.signup);
    app.post('api/auth/signin',controller.signin);
}