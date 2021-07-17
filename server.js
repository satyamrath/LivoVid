const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Metadata = require('./models/Metadata.js');

const app = express()
app.set('view engine', 'ejs');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true, useUnifiedTopology: true
})	

// app.get('/',async (req, res)=>{
//     const metadatas = await Metadata.find();
//     res.render('index', { metadatas });

// });

app.get('/getVideos',async (req, res)=>{
    const metadatas = await Metadata.find();
    res.send(metadatas);
});

app.get('/getDetails', async (req, res)=>{
    console.log(req.query.id);
    const id = req.query.id;
    if(req.query.id == null){
        return res.send("404");
    }
    try{
        const metadata = await Metadata.findOne({_id: id});
        console.log(metadata);
        // res.render('watch', {metadata: metadata});
        res.send(metadata);
    }catch(err){
        res.status(404).send({message: 'page not found'});
    }
});

app.get('/video/:id', (req, res)=>{
    const range = req.headers.range;
    if(!range){
        res.status(400).send('Requires Range header');
    }
    console.log(range);
    const videoPath = `Storage/${req.params.id}`;
    const videoSize = fs.statSync(videoPath).size;
    // console.log(videoSize);

    // Parse Range
    // Example: "bytes=65325-"
    const CHUNK_SIZE = 10 ** 6; // 1 MB
    const start = Number(range.replace(/\D/g, "")); // replace non-digit character with ""
    const end = Math.min(start + CHUNK_SIZE, videoSize -  1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
})

PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}!`);
});