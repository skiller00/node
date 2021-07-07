const express = require('express');
const app = express();
const homepage=require('./router/homepage')
const contact  = require('./router/contact')
const login = require('./router/login')
const about = require('./router/about')
const path = require('path')
const bp = require('body-parser')

app.set('view engine','ejs')
app.set('views','views')
app.use(bp.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,'public')))

app.use(homepage)
app.use(contact)
app.use(login)
app.use(about)


app.listen(3000);
