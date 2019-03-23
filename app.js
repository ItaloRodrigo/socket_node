/*
	dependencias
	
	npm install express --save
	npm install nodemon -g
	npm install --save sequelize
	npm install --save mysql2
	npm install --save express-handlebars
	npm install --sabe body-parser

*/

const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

app.use(express.static(path.join(__dirname,'public')));

//------------------------------------------

const server = app.listen(3000,function(){
    console.log('conectado na porta 3000')
});

//------------------------------------------

const io = SocketIO(server);


io.on('connection',function(socket){
    console.log('new Connection',socket.id);
    socket.on('chat:message',function(data){
        console.log(data); 
        io.sockets.emit('chat:message',data);       
    });

    socket.on('chat:envio',function(data){
        socket.broadcast.emit('chat:envio',data);
    });
});


//app.set('port',process.env.PORT || 3000);


//console.log(path.join(__dirname,'public/index.html'));

/*
app.get('/',function(req,res){
    res.send('alo mundo');
});
*/



/*
app.listen(app.get('port'),function(){
    console.log('conectado na porta 3000')
});
*/