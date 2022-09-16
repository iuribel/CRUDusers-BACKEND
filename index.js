const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

//ROUTES//
//Create an user
app.post("/users", async(req,res)=>{
    try{

        const { Nombre, Birthday, Id } = req.body;

        const newUser = await pool.query('INSERT INTO useer (Nombre, Birthday, Id) VALUES ($1, $2, $3) RETURNING *',
        [Nombre, Birthday, Id]
        );

        res.json(newUser.rows[0]);

    }catch(err){
        console.error(err.message);
    }
})
//Get all users
app.get("/users", async(req,res)=>{
    try{

        const allusers = await pool.query("SELECT * FROM useer");
        res.json(allusers.rows);

    }catch(err){
        console.error(err.message);
    }
})
//Get an user
app.get("/users/:id", async(req,res)=>{
    try{

        const {id}= req.params;
        const user = await pool.query("SELECT * FROM useer WHERE Id =$1;",[id]);

        res.json(user.rows[0]);

    }catch(err){
        console.error(err.message);
    }
})

//Update an user
app.put("/users/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const { Nombre, Birthday, Id } = req.body;
        //console.log(Id);      
        const updateduser = await pool.query("UPDATE useer SET Nombre = $1, Birthday = $2, Id = $4 WHERE Id = $3",[
            Nombre,Birthday,id,Id
        ]);
        res.json(updateduser);
    }catch(err){
        console.error(err.message);
    }
})
//Delete an user
app.delete("/users/:id", async(req,res)=>{
    try{

        const {id}= req.params;
        const deleteduser = await pool.query("DELETE FROM useer WHERE  Id = $1;",[id]);

        res.json(deleteduser);

    }catch(err){
        console.error(err.message);
    }
})

app.listen(5000, () =>{
    console.log('Server has started on port 5000')
})
