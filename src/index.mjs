import express, { response } from "express";

const app = express();

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

// app.use(loggingMiddleware);
const resolveIndexByUserId = (req, res, next) => {
    const { params: { id } } = req;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        return res.sendStatus(400);
    }  
    const findUserIndex = testing.findIndex((data) => data.id === parseId);
    if (findUserIndex === -1) {
        return res.sendStatus(404);
    }
    req.findUserIndex = findUserIndex;
    next();
}


const PORT = process.env.PORT || 3000;
const testing = [
    {id:1, username:"alice", fullname:"Alice Wonderland"},
    {id:2, username:"bob", fullname:"Bob Builder"},
    {id:3, username:"charlie", fullname:"Charlie Brown"},
    {id:4, username:"david", fullname:"David Goliath"},
    {id:5, username:"eve", fullname:"Eve Smith"},
    {id:6, username:"frank", fullname:"Frank Sinatra"},
    {id:7, username:"grace", fullname:"Grace Hopper"},
    {id:8, username:"heidi", fullname:"Heidi Klum"},
    {id:9, username:"ivan", fullname:"Ivan Drago"},
    {id:10, username:"judy", fullname:"Judy Garland"},
    {id:11, username:"karl", fullname:"Karl Marx"},
    {id:12, username:"lisa", fullname:"Lisa Simpson"},
];


app.get('/',(req,res) => {
    res.status(200).send({message:"ini testing"});
});

// app.use(loggingMiddleware,(req,res,next) => {
//     console.log("finishing middleware");
//     next();
// });
app.get('/api/test',(req,res) => {
    console.log(req.query);
    const  {query:{ filter,value }} = req;
    if (filter && value) {
        return res.status(200).send(testing.filter((data) => data[filter].includes(value)));
    }else{
        return res.status(200).send(testing);}
    // return res.status(200).send(testing);
});

app.get('/api/test/:id',resolveIndexByUserId,(req,res)=>{
    // res.status(200).send({message:`ini id ${req.params.id}`});
    // console.log(req.params);
    // const parseId = parseInt(req.params.id);
    // console.log(parseId);
    // if(isNaN(parseId)){
    //     res.status(404).send({message:"id not found"});
    // }else{
    //     const data = testing.find((data)=>data.id === parseId);
    //     if(data){
    //         res.status(200).send(data);
    //     }else{
    //         res.status(404).send({message:"id not found"});
    //     }
    // }
    const {findUserIndex} = req;
    const findUser = testing[findUserIndex];
    if(!findUser){
        return res.sendStatus(404);
    }return res.status(200).send(findUser);
})

app.post('/api/test',(req,res)=>{
    // console.log(req.body);
    console.log(req.body);
    const newData = {id:testing.length+1, ...req.body};
    // const newData = req.body;
    testing.push(newData);
    return res.send(newData);
})

app.put('/api/test/:id',resolveIndexByUserId,(req,res)=>{
    // const { body, params: { id } } = req;
    // const parseId = parseInt(id);
    // if (isNaN(parseId)) {
    //     return res.sendStatus(400);
    // }  
    // const findUserIndex = testing.findIndex((data) => data.id === parseId);
    // if (findUserIndex === -1) {
    //     return res.sendStatus(404);
    // }
    const { body, findUserIndex} = req;
    testing[findUserIndex] = {id: testing[findUserIndex].id, ...body};
    return res.send(testing);
}
);

app.patch('/api/test/:id',resolveIndexByUserId,(req,res)=>{
    const  { body, findUserIndex} = req;
    // const  { body, params: { id }} = req;
    // const parseId = parseInt(id);
    // if (isNaN(parseId)) return res.sendStatus(400);
    // const findUserIndex = testing.findIndex((data)=>data.id === parseId);
    // if (findUserIndex === -1) return res.sendStatus(404);
    testing[findUserIndex] = {...testing[findUserIndex], ...body};
    res.status(200).send(testing);  
})


app.delete('/api/test/:id',resolveIndexByUserId,(req,res)=>{
    const { findUserIndex} = req;
    // const parseId = parseInt(id);
    // if (isNaN(parseId)) return res.sendStatus(400);
    // const findUserIndex = testing.findIndex((data)=>data.id === parseId);
    // if (findUserIndex === -1) return res.sendStatus(404);
    testing.splice(findUserIndex,1);
    res.status(200).send(testing); 
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});