const  EventEmitter=require('events')


class School extends EventEmitter{
  startPeriod(){
    console.log("class Startd");

    this.emit('bellring',{
      period:'first',
      text:"period ended"
    })
  }

}

module.exports=School;