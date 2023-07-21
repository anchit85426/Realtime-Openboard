const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static('public'));


io.on('connection', (socket) => {
  
    console.log('a user connected',socket.id);
    socket.on("beginPath",(data)=>{
        // data from frontend
        // transfer to all connections 
        io.sockets.emit("beginPath",data);
    })
    socket.on("drawStroke",(data)=>{
        // data from frontend
        // transfer to all connections 
    
        io.emit("drawStroke",data);
    })
    socket.on("redoUndo",(data)=>{
        
        io.emit("redoUndo",data);
    })
    
  });
  
server.listen(3000,() => {
    console.log('listening on *:3000');
});