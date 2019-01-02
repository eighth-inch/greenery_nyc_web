const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const path = require('path');
const api = require('./api');
const bodyparser = require('body-parser');
const { sync, seed } = require('./db')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());


//URL Router
app.use('/api', api);

//Static Files
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;

//Commented out durring testing 
app.listen(PORT, ()=> {
    sync().then(()=> seed());
    console.log("it's....");
    setTimeout(() => {
      console.log(`....alive... App Listening on port: ${PORT}`);
    }, 500);
});

