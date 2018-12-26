const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;


app.get('/', (req, res, next) => {
    return res.sendStatus(200);
}).

app.listen(PORT, ()=> {
    console.log("it's....");
    setTimeout(() => {
      console.log(`....alive... App Listening on port: ${PORT}`);
    }, 500);
});