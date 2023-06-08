// path module
const path=require('path')

const myPath="/home/rafi/Desktop/code/node-js/index.js"

// console.log(path.basename(myPath))

// console.log(path.dirname(myPath))

// console.log(path.parse(myPath))

// console.log(path.isAbsolute(myPath))

// console.log(path.extname(myPath))

// console.log(path.normalize(myPath))
// console.log(path.posix)


//os module 
// const os=require('os')
// console.log(os.platform())
// console.log(os.release())
// console.log(os.freemem())
// console.log(os.cpus())
// console.log(os.homedir())
// console.log(os.hostname())
// console.log(os.machine())
// console.log(os.type());
// console.log(os.arch())
// console.log(os.version())
// console.log(os.uptime())
// console.log(os.totalmem())
// console.log(os.networkInterfaces())

//file system
const fs=require('fs')

//synchoronus  way main threat block
// fs.writeFileSync('1.txt','hello programmers');
// fs.writeFileSync('1.txt',"How are you? ")
// fs.appendFileSync('1.txt',"I am fine")

// const data=fs.readFileSync('1.txt')
// console.log(data.toString())


//asynchronous way

// fs.readFile('1.txt',(err,data)=>{
//   console.log(data.toString())
// })  


// fs.writeFile('1.txt','Hello content!',(err)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log("success")
//   }
// })


//Event module

const  EventEmitter=require('events')
const emmiter=new EventEmitter()

// //register a listener for belling event
// emmiter.on('bellring',function({period,text}){
//   console.log(`we need to run ${period} ${text}`)
// });


// //raise and 
// emmiter.emit('bellring',{
//   period:'first',
//   text:"period ended"
// })


// const School=require('./event/school');

// const school=new School()

// school.on('bellring',function({period,text}){
//   console.log(`we need to run ${period} ${text}`)
// });


// school.startPeriod()


