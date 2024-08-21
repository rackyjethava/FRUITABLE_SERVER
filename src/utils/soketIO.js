const { Server } = require('socket.io');
const connectchat=()=>{
    const io = new Server({
        cors: {
          origin: "http://localhost:3000"
        }
      });

    io.on('connection', (socket) => {
        console.log('a user connected',socket.id);

        socket.emit("welcome","welcome to fruteble")
        socket.broadcast.emit("greeting","hello clinte")

        socket.on("message",(data)=>{
          console.log(data);

          io.to(data.receiver).emit("rec-msg",data.message)
        })

        socket.on("groip-join",(group_name)=>{
           socket.join(group_name)
        })
      });

      io.listen(4000)
}

module.exports=connectchat
