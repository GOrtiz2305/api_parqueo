const express       = require('express');
const cors          = require('cors');
const logger        = require('morgan');
const http = require('http');
const app = express();

app.use(logger('dev'));

//validacion de rutas
app.use(cors());

/* Agruegué el de express que el de bodyparser daba deprecate */
app.use(express.json({limit:"50mb"}));  
app.use(express.urlencoded({limit:"50mb" , extended: false }));  


require("./routes")(app);


/* genera  las tablas en la base de datos */

 app.use(express.static('./public'));


app.get('*', (req, res) => res.status(200).send({
     message: 'Index.',
}));

const port = 3003;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;