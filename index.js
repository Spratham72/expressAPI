const { request } = require('express');
const express=require('express');
const app=express();
const data=require('./data.json')
app.use(express.json());
let arr=[];
arr=[...data]
let middleFunc=(req,res,next)=>{
   req.request="pratham";
    next();
}
app.use(middleFunc);
app.get('/',(req,res)=>{
    const obj={
        "api_requested_by":req.request,
        "books":arr
    }
    res.send(obj)
})
app.post('/books',(req,res)=>{
    const {author}=req.body;
    const {book_name}=req.body;
    const {pages}=req.body;
    const {published_year}=req.body;
    arr.push(req.body)
    res.send(arr)
    console.log(req.body)
})
app.get('/books/:id',(req,res)=>{
    var select=arr.filter(obj=>{
        return obj.author===Number(req.params.id);
    });
    const obj={
        "api_requested_by":req.request,
        "books":select
    }
     res.send(obj)
})
app.patch('/books/:id',(req,res)=>{
    const edit=arr.find(obj=>{
       if(obj.author==req.params.id){
           obj.author=req.body.author;
           obj.published_year=req.body.published_year;
           return;
       };
    })
    res.send(arr)
})
app.delete('/books/:id',(req,res)=>{
    const deleted=arr.filter((obj)=>{
         return obj.author !== Number (req.params.id);
    })
    res.send(deleted)
    
})
app.listen(1234,()=>{
    console.log("Server is running in port 1234")
})