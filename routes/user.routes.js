const {authJwt} = require('../middlewares/authjwt');
const controller = require('../controllers/user.controller');

module.exports = function(app){
    app.use((req,res,next)=>{
        res.headers("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get('/api/test/all',controller.allAccess);
    app.get('/api/test/use',[authJwt.verifyToken],controller.userBoard);
    app.get('api/test/mod',[authJwt.verifyToken,authJwt.isModerator],controller.moderatorBoard);
    app.get('api/test/admin',[authJwt.verifyToken,authJwt.isAdmin],controller.adminBoard);
    


    
}
