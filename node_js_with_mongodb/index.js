var MongoClient = require('mongodb').MongoClient;
// all database conncetion..........
var URL = "mongodb+srv://rafiul:y7danRLVfuPsFz1O@cluster0.xdpjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//specific data base connection............
//var URL = "mongodb+srv://rafiul:y7danRLVfuPsFz1O@cluster0.xdpjw.mongodb.net/demo?retryWrites=true&w=majority";
//
MongoClient.connect(URL,function(error,MyMongoClicent){
    if(error){
        console.log("Conenction Fail");
    }else{
        console.log("Connetion Success");
     //InsertData(MyMongoClicent)
        //   deleteOneItem(MyMongoClicent);
         // DeleteAllItem(MyMongoClicent);
         //FindOneWithoutCondition(MyMongoClicent);
         //FindOneWithCondition(MyMongoClicent)
        // FindAllData(MyMongoClicent);
        FindAllDataProjection(MyMongoClicent);
    }
});
//insert data mongodb...............
function InsertData(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
   var MyCollection = MyDataBase.collection('student');
   var MyData={name:"Rafiul1",Roll:"02",class:"B.s.c",city:"Kushtia",village:"mohonpara"};
   MyCollection.insertOne(MyData,function(error){
       if(error){
           console.log("data insert fail");
       }else{
           console.log("data insert success");
       }
   })
}

//delete one  item with mongodb............
function deleteOneItem(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
    var MyCollection = MyDataBase.collection('student');
    var DeleteItem={Roll:"01"};
    MyCollection.deleteOne(DeleteItem,function(error){
        if(error){
            console.log("Data Delete Fail");
        }else{
            console.log("Data Delete Success")
        }
    });
}
//delete many items ............
function DeleteAllItem(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
    var MyCollection = MyDataBase.collection('student');
    MyCollection.deleteMany(function(error,resultobj){
            if(error){
                console.log("Delete Fail");
            }else{
                console.log(resultobj.deletedCount);
            }
    });
}

//data find items withoutconditions..........
function FindOneWithoutCondition(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
    var MyCollection = MyDataBase.collection('student');
    var FindObj={}
    MyCollection.findOne(FindObj,function(error,result){
            console.log(result);
    });
}

//data find items withconditions..........

function FindOneWithCondition(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
    var MyCollection = MyDataBase.collection('student');
    var FindObj={Roll:"01"}
    MyCollection.findOne(FindObj,function(error,result){
            console.log(result);
    });
}

//find all data .......................
function FindAllData(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
    var MyCollection = MyDataBase.collection('student');
    MyCollection.find().toArray(function(error,result){
        console.log(result);
    });
}

//specific column select .......find projection.....


function FindAllDataProjection(MyMongoClicent){
    var MyDataBase=MyMongoClicent.db("School");
    var MyCollection = MyDataBase.collection('student');
    var Itemobj={}
    var ItemProjection={projection:{Roll:" ",class:" "}}
    MyCollection.find(Itemobj,ItemProjection).toArray(function(error,result){
        console.log(result);
    });
}
