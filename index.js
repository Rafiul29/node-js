const fs=require('fs')

//read stream
// const ourReadStream=fs.createReadStream("/home/rafi/Desktop/code/node-js/1.txt",)
// // 'utf8' 
// ourReadStream.on('data',(chunk)=>{
//   console.log(chunk)
// })
// console.log("hello")


// write stream
const ourReadStream=fs.createReadStream(`${__dirname}/1.txt`)


const ourWriteStream=fs.createWriteStream(`${__dirname}/output.txt`)

// ourReadStream.on('data',(chunk)=>{
//   ourWriteStream.write(chunk)
// })

//another way
// ourReadStream.pipe(ourWriteStream)

const http=require('http');
const server=http.createServer((req,res)=>{

  const myreadStream=fs.createReadStream(`${__dirname}/1.txt`)
  myreadStream.pipe(res)

})

server.listen(3000);

