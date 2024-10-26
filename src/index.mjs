import express, { response } from "express";

const app = express();

app.use(express.json());

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

app.get('/api/test',(req,res) => {
    console.log(req.query);
    const  {query:{ filter,value }} = req;
    if (filter && value) {
        return res.status(200).send(testing.filter((data) => data[filter].includes(value)));
    }else{
        return res.status(200).send(testing);}
    // return res.status(200).send(testing);
});

app.get('/api/test/:id',(req,res)=>{
    // res.status(200).send({message:`ini id ${req.params.id}`});
    console.log(req.params);
    const parseId = parseInt(req.params.id);
    console.log(parseId);
    if(isNaN(parseId)){
        res.status(404).send({message:"id not found"});
    }else{
        const data = testing.find((data)=>data.id === parseId);
        if(data){
            res.status(200).send(data);
        }else{
            res.status(404).send({message:"id not found"});
        }
    }
})

app.post('/api/test',(req,res)=>{
    // console.log(req.body);
    console.log(req.body);
    const newData = {id:testing.length+1, ...req.body};
    // const newData = req.body;
    testing.push(newData);
    return res.send(testing);
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});