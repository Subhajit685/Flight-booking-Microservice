import mysql from "mysql2"

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database : "airplane",
    password : 'Babai@09'
})

con.connect((err)=>{
    if(err){
        console.log(`Database not connected : ${err}`)
    }else{
        console.log(`Database connected`)
    }
})

export default con.promise()