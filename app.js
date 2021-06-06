const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 4000;
// const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

dotenv.config({ path:'config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });


const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.render('thankyou.pug')
    }).catch(()=>{
        res.status(400).send("Not saved Please Try Again")
    });
    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
