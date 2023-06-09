// uptime monitoring application
//restful api to monitor up or down time of user define links

//dependencies
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

const routes=require('../routes')
const {notFoundHandler}=require('../handlers/routeHandler/notFoundHandler')
//app object - module saffolding;
const handler = {};



//handle request response
handler.handleRequest = (req, res) => {
  //request handling
  //get path url parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimPath = path.replace(/^\/+|\/+$/g, "");

  const method = req.method.toLowerCase();
  const queryString = parsedUrl.query;
  const headers = req.headers;

  // console.log(trimPath,method,queryString,headers)

  //
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const requestProperties={
    parsedUrl,
    path,
    trimPath,
    method,
    queryString,
    headers,
  }


  const chosenHandler=routes[trimPath] ? routes[trimPath] :notFoundHandler


  chosenHandler(requestProperties,(statusCode,payload)=>{
    statusCode==typeof(statusCode)==='number' ? statusCode : 500
    payload=typeof(payload)==="object" ? payload:{}

    const payloadString=JSON.stringify(payload)
      res.writeHead(statusCode);
      res.end(payloadString)
  });

  res.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  res.on("end", () => {
    realData += decoder.end();
    
  });
  console.log(realData);
  res.end("hello word");
};


module.exports=handler