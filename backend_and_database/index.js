const express = require('express');
const app = express();
const pool =require("./db");
var cors = require('cors');
app.use(express.json()) //->req.body
app.use(cors());
//ROUTES

//get all user
app.get("/users", async(req,res) => {
    try{

        const getUsers = await pool.query("SELECT * FROM user_table");
        res.json(getUsers.rows);
        console.log("get request is successful.");
    }catch(error){
        console.error('errors',error.message)
    }
})

//get a user
app.get("/users/:id", async(req,res) => {
    const {id} = req.params;
try{
    console.log("getting a user")
    const getUser = await pool.query("SELECT * FROM user_table WHERE id = $1",[id]);
console.log("params", req.params);
res.json(getUser.rows[0]);
}
catch(error){
    console.log("error:", error.message);
}
})
//create a user
app.post("/users",async(req,res)=>{
    try{
//await
console.log("post request successful");
console.log(req.body);

const {firstname, middlename, lastname,email,phonenumber,role,address} = req.body //destructuring

const newUser = await pool.query(" INSERT INTO user_table (firstname, middlename, lastname,email,phonenumber,role,address) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [firstname, middlename, lastname,email,phonenumber,role,address]);




res.json(newUser);


    }
    catch(error){
console.error('error:',error.message);
    }
})

//update a user
app.put("/users/:id", async(req,res)=>{
    try{
console.log("updated");
        const {id} = req.params;
        const {firstname, middlename, lastname,email,phonenumber,role,address} = req.body //destructuring, data to update into old values
        const updateUser = await pool.query("UPDATE user_table SET firstname =$1, middlename=$2, lastname=$3,email=$4,phonenumber=$5,role=$6,address=$7 WHERE id = $8",[firstname, middlename, lastname,email,phonenumber,role,address,id]);
        res.json(updateUser);
    }
    catch(error){
        console.log("error",error.message);
    }
})

//delete a user
app.delete("/users/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteUser= await pool.query("DELETE FROM user_table WHERE id=$1",[id]);
        res.json(deleteUser);

    }catch(error){
console.log("error",error.message)
    }
})


//server setup
app.listen(8080, ()=>{
    console.log("sever is listening at port 8080");
})