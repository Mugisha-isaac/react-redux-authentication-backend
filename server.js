const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./model');
const app = express();
const {authRoutes} = require('./routes/auth.routes');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const Role = db.role;
db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync database');
    initial();
})

function initial(){
    Role.create({
        id:1,
        name:'user'
    });
    Role.create({
        id:2,
        name:'moderator'
    });
    Role.create({
        id:3,
        name:'admin'
    });
}

app.get('/',(req,res)=>{
    res.json({message:'welcome on react redux authentication course'});
})
app.use('/api/auth',authRoutes);

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})