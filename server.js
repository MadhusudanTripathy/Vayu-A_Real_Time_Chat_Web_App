const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT=process.env.PORT || 3000;
const http=require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));///this line make all href in htmls valid


app.get("/", function (req, res) {
return res.sendFile(__dirname+"/index.html")
});

http.listen(PORT, function ()//dynamic port and static port both are added
{
   console.log("server started successfully at portnumber "+PORT);
});
//SOCKET
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('new-user-joined',(name)=>{
   
        socket.broadcast.emit('new-user-joined',name);
    });
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
