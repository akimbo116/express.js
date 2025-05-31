const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/db')
require('dotenv').config()

app.use(express.static('public'))
app.use(express.json())
app.use(cors())


app.get('/list',(req,res) => {
    db.query('SELECT * FROM tasks', (err,results) => {
        if (err) return res.status(500).json({messgae : "Terjadi Masalah Saat memasukan data " + err});
        res.send(results)
    })
    
});

app.post('/list',(req ,res) => {
    const {text} = req.body;
    if (!text || typeof text !== "string" ) res.status(400).send("Text tidak valid")
    db.query("insert into tasks (text) values (?)",[text], (err,results) => {
        if (err) return res.status(500).send('Terjadi Kesalahan saat menambahkan data ' + err)     
        res.json({
            message : 'Berhasil menambahkan data',
            text : text,
           
        })
    })
})

app.put('/list/:id',(req,res) => {
    const {id} = req.params
    db.query('update tasks set completed =  NOT completed where id = (?)',[id], (err,results) => {
        if (err) return res.status(500).json({message : "Kesalahan saat mengupdate masalah " + err})
        
        res.status(200).json({
            message : "Berhasil mengupdate data ",
        })
    })
})

app.delete('/list/:id',(req,res) => {
    const {id} = req.params;
    db.query("delete from tasks where id = (?)", [id], (err,results) => {
        if (err) return res.status(500).json({message : "Kesalahan saat menghapus masalah " + err})
            res.status(200).json({
            message : "Berhasil menghapus data" 
        })
    })

});

const port = process.env.PORT;
app.listen(port,()=> 
    console.log(`server berjalan di port http://127.0.0.1:${port}`)
)