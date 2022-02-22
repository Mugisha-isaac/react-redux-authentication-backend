const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions ={
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.json('welcome on react redux authentication course');
})

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log('server running');
})