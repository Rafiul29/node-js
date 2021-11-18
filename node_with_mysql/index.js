var mysql=require('mysql');
var DatabaseconnectionConfig={
    host:"Localhost",
    user:"root",
    passwaed:"",
    database:"school"
}
var con=mysql.createConnection(DatabaseconnectionConfig);
con.connect(function(error){
    if(error){
        console.log("connection Fail");
    }else{
        console.log("Conncetion Success");
              // InsertData(con);
        //DeleteDataById(con);
         // updateDataById(con);
         SelectorData(con);
           
    }
})
//Insert to the data base
function InsertData(con){
        let SQLQuery="INSERT INTO `student_table`(`name`, `roll`, `class`) VALUES ('Rasu','18290','B(ENG)')"
    con.query(SQLQuery,function(error){
        if(error){
            console.log("Data insert fail");
        }else{
            console.log("Data insert success");
        }
    })
}
//Delete to the data base list//
function DeleteDataById(con){
    let SQLQuery="DELETE FROM `student_table` WHERE 'id'='6'";
    con.query(SQLQuery,function(error){
        if(error){
            console.log("Data Delete fail");
        }else{
            console.log("Data Delete Success");
        }
    })
}

//update to the data base list

function updateDataById(con){
    let SQLQuery="UPDATE `student_table` SET`roll`='940980' WHERE 'id'='7'";
    con.query(SQLQuery,function(error){
        if(error){
            console.log("Data update fail");
        }else{
            console.log("Data update Success");
        }
    })
}

//Data selector.................


function SelectorData(con){
    let SQLQuery="SELECT * FROM `student_table`";
    con.query(SQLQuery,function(error,result){
        if(error){
            console.log("data select fail")
        }else{
            console.log(result);
        }
    })
}