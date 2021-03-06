const express = require('express');
const app = express();
const user = require('./models/user'); 
const historytransfers = require('./models/history-of-transfers'); 
const bodyParser = require('body-parser'); //parsing to json 
const sequelize = require('./utils/database');
const authRoute = require('./routes/auth.js');
const userpanelRoute = require('./routes/userpanel');
const adminpanelRoute = require('./routes/admin');
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json());//this must be if we want to work for json's files 
app.use((req, res, next) => {//cors policy
    res.setHeader('Access-Control-Allow-Origin', '*'); //https://bank-app-github-react.herokuapp.com *-> during development
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(authRoute);// '/'

app.use('/user',userpanelRoute);

app.use('/admin',adminpanelRoute);

app.use((error,req,res,next)=>{//error handling
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message
  });
});

user.hasMany(historytransfers,{onDelete: 'CASCADE'});//relations between user and history of transfer model 
historytransfers.belongsTo(user); 

sequelize//our database connect
.sync()
.then(()=>{
    const server = app.listen(process.env.PORT||3000);
    const socket = require('./utils/socket').init(server);
    socket.on('connect',socket=>{
      console.log('connected');
    });
})

