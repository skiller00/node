const express= require('express');
const router = express.Router();
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`))

router.get('/about',(req,res)=>{
    res.render('about',{
        pageTitle:"About page" ,
        users:data.results
    })
})


module.exports = router;