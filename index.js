const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()
const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public'))

app.get('/', (req, res) =>{
    res.json({message:"All good"})
})

app.get('/all-receipes', (req, res)=>{

    Receipe.find().then((receipes)=>{
        res.json(receipes);
    })
    .catch((req, res)=>{
        res.json({message :"Something is wrong"});
    });
})

app.post('/add-receipe', (req, res)=>{
    const {receipeName, receipeTime, ingredeints, serves} = req.body;
    const receipe = new Receipe({
    receipeName: receipeName,
    receipeTime: receipeTime,
    ingredeints: ingredeints,
    serves: serves
    })
    receipe.save().then((receipe)=>{
        res.json({message: "receipe added successfully"});
    })
    .catch((req, res)=>{
        res.json({message :"Something is wrong"});
    });
})

app.post('/update-receipe/:id', (req, res)=>{
    let {id} = req.params;
    const {receipeTime, serves}=req.body;
    Receipe.findByIdAndUpdate(id, {
        receipeTime: receipeTime,
        serves: serves
    }).then((receipe)=>{
        res.json({message :"receipe updated successfully"});
    })
    .catch((error)=>{
        res.json({error:error});
    });
})

app.get('/delete-receipe/:id',(req, res)=>{
    let {id}=req.params;
    Receipe.findByIdAndDelete(id).then((receipe)=>{
        res.json({message:"Receipe delete successfully"});
    })
    .catch((error)=>{res.json({error:error});
})
})
const Receipe = mongoose.model('Receipe', {
    receipeName: String,
    receipeTime: String,
    ingredeints: Array,
    serves: String
})

app.listen(process.env.PORT, () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
        
    ).then(()=>{
        console.log(`Server is running successfully on ${process.env.PORT}`);
    })
    .catch((err)=>{
        console.log(err);
    });
    
})