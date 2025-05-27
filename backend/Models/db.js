const mongoose = require('mongoose');
require('dotenv').config(); 

const mongo_url = process.env.MONGO_DB;

mongoose.connect(mongo_url)
    .then( () => {
        console.log('mongodb connected sucessfully....');
    }).catch( (err) => {
        console.log('mongodb connection error...', err);
    })
