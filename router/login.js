const express= require('express');
const router = express.Router();
const fs = require('fs');
const usersData = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`))

router.get('/user/login',(req,res)=>{
    res.render('login')
})
router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    console.log(email)
    res.redirect('/')
})

module.exports = router;