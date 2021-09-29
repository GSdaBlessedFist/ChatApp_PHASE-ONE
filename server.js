const p = console.log;
require('dotenv').config();
const express = require('express');
const app = express();
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');

const socket = require('socket.io');
const chalk = require('chalk');
//https://developers.giphy.com/
const gifAPIkey = process.env.GIF_APIKEY;

const port = process.env.PORT || 3400;
const server = app.listen(port, () => {
  console.log(`Red to go on port ${port}!`)
  console.log("empty room")
});
const nameofApp = "Chatnimity";
app.use(express.static('public'));
// app.use(morgan('tiny'));

// Express config
const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./src/templates/views");
const partialsPath = path.join(__dirname, "./src/templates/partials");

// Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: nameofApp,
    clientname: "clientName",
    gifAPIkey: gifAPIkey
  })
})
const io = socket(server);
var clientNum = 0;
var currentUsers = [];
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  socket.on('add-client', (data) => {
    clientNum++;
    console.log('currentUsers: ' + clientNum);
    currentUsers.push(data);
    console.log(chalk.bgGreen.black.bold("Introducing..." + data.screenname))
    console.log(currentUsers);
    socket.emit('number-assignment', clientNum);
  })
  socket.on('message.chat', (data) => { //<---
    // console.log(data)
    io.sockets.emit('chat', {
      socketInfo: socket.id,
      screenname: data.screenname,
      message: data.message,
      image: data.image
    });
  })
  socket.on('gif.message',(data)=>{
    console.log(data.image)
    io.sockets.emit('gif.chat',{
      socketInfo: socket.id,
      screenname: data.screenname,
      image: data.image
    })
  })


  socket.on('disconnect', () => {
  clientNum--;
  if (clientNum === 0) {
    currentUsers = [];
    console.log("empty room");
  } else {
    console.log('currentUsers: ' + clientNum);
  }
});
  
})
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
