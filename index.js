// uptime monitoring application
//restful api to monitor up or down time of user define links

//dependencies
const http = require("http");


const {handleRequest}=require('./helpers/handleRequets')
//app object - module saffolding;
const app = {};

//configuration
app.config = {
  port: 3000,
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleRequest);

  server.listen(app.config.port, () => {
    console.log(`listening server port on ${app.config.port}`);
  });
};

//handle request response
app.handleRequest = handleRequest
//start server
app.createServer();
