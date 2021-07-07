const express= require('express');
const router = express.Router();
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`))
const dataPost = JSON.parse(fs.readFileSync(`${__dirname}/../data/posts.json`))
const dataCom = JSON.parse(fs.readFileSync(`${__dirname}/../data/comments.json`))
const dataAlbums = JSON.parse(fs.readFileSync(`${__dirname}/../data/albums.json`))
const dataPhotos = JSON.parse(fs.readFileSync(`${__dirname}/../data/photos.json`))
router.get('/',(req,res)=>{
    res.render('index',{
        pageTitle:"Welcome" ,
        users:data.results ,
    })
   
})

router.get('/:id',(req,res)=>{
    const id = req.params.id
    const userId= data.results.find(el=> el.login.uuid=== id)
    const postId = dataPost.filter(el=> el.userId === userId.usersId)
    const albums = dataAlbums.filter(el=>el.userId===userId.usersId)
    // console.log(postId)
    if(!userId){
        res.render('404')
    } else{
        res.render('userPage',{
            pageTitle:`${userId.name.title} ${userId.name.first} ${userId.name.last}`,
            users:userId,
            posts:postId,
            albums:albums
        })
    }   
})
router.get('/:id/post/:coms',(req,res)=>{
    const paramComs = req.params.coms
    const id = req.params.id
    const userId= data.results.find(el=> el.login.uuid=== id)
    const postId = dataPost.filter(el=> el.userId === userId.usersId)
    const onePost = postId.filter(el=> el.id==paramComs)
    const comments = dataCom.filter(el => el.postId == paramComs)
    if(!comments){
        res.render('404')
    }else{
        res.render('post',{
            post:onePost[0],
            comments:comments
        })  
    }
    console.log(onePost)
})

router.get('/:id/album/:albumId',(req,res)=>{
    const albumId= req.params.albumId
    const id = req.params.id
    const userId= data.results.find(el=> el.login.uuid=== id)
    const albums = dataAlbums.filter(el=>el.userId ===userId.usersId)
    const oneAlbum = albums.filter(el=>el.id==albumId)
    const photos= dataPhotos.filter(el=>el.albumId==albumId)
    if(!photos){
        res.render('404')
    } else{
        res.render('photo',{
            albums: oneAlbum ,
            photos:photos
        })
    }

})

module.exports = router;