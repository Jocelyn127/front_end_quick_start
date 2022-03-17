const fs = require('fs');
// fs.readFile('./resource/content.txt', (err,data)=>{
//     if(err) throw err;
//     console.log(data.toString())
// })

// const p = new Promise((resolve, reject)=>{
//     fs.readFile('./resource/content.txt',(err, data)=>{
//         if(err) reject(err);
//         resolve(data);
//     })
// });

// p.then((data)=>{
//     console.log(data.toString());
// }, err=>{
//     console.log('failed');
// })

//Util.promisefy
const util = require('util');
let minReadFile = util.promisify(fs.readFile);
minReadFile('./resource/content.txt').then(value=>{
    console.log(value.toString());
})



